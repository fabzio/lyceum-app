import db from '@/database'
import {
  jobRequests,
  evaluations,
  accounts,
  courseHiringRequirements,
  courseHirings,
  hirings,
  units,
  courses,
  accountsPerHiring,
} from '@/database/schema'
import {
  and,
  eq,
  inArray,
  desc,
  sql,
  asc,
  or,
  ilike,
  notInArray,
} from 'drizzle-orm'

import { HiringSelectionDAO } from '../dao'
import {
  JobRequestNotFoundError,
  InvalidStatusChangeError,
  CourseHiringNotFoundError,
} from '../errors'
import { JobRequestsSchema } from '@/database/schema/jobRequests'
import { AccountsSchema } from '@/database/schema/accounts'
import {
  courseStep,
  hiringType,
  jobRequestState,
} from '@/database/schema/enums'
import { CreateHiringSelectionPropDTO } from '../dtos/hiringSelectionDTO'
import { HiringNotFoundError } from '../errors/hiringSelection.error'
import { GetHiringsWithCoursesQueryDTO } from '../dtos/hiringSelectionDTO'
import { HiringsWithCoursesDTO } from '../dtos/hiringSelectionDTO'
import { CourseHiringRequirementsSchema } from '@/database/schema/courseHiringRequirements'
import groupBy from 'just-group-by'
import { ZodUndefined } from 'zod'
import { requestId } from 'hono/request-id'

class HiringSelectionService implements HiringSelectionDAO {
  public async createHiringSelection(newHiring: CreateHiringSelectionPropDTO) {
    const unit = await db
      .select()
      .from(units)
      .where(
        and(
          or(eq(units.type, 'department'), eq(units.type, 'section')),
          eq(units.id, newHiring.unitId)
        )
      )

    if (unit.length === 0) {
      throw new HiringNotFoundError('Su unidad no es un departamento o sección')
    }
    await db.transaction(async (tx) => {
      const [{ newHiringId }] = await tx
        .insert(hirings)
        .values({
          description: newHiring.description,
          unitId: newHiring.unitId,
          startDate: newHiring.startDate.toISOString(),
          endReceivingDate: newHiring.endReceivingDate.toISOString(),
          resultsPublicationDate:
            newHiring.resultsPublicationDate.toISOString(),
          endDate: newHiring.endDate.toISOString(),
        })
        .returning({
          newHiringId: hirings.id,
        })

      const newCourseHiringIds = await tx
        .insert(courseHirings)
        .values(
          newHiring.courses.map((course) => ({
            hiringId: newHiringId,
            courseId: course.id,
          }))
        )
        .returning({
          newCourseHiringId: courseHirings.id,
          hiringId: courseHirings.hiringId,
          courseId: courseHirings.courseId,
        })
      const mapCourseHiringId = new Map(
        newCourseHiringIds.map((courseHiring) => [
          `${courseHiring.hiringId}-${courseHiring.courseId}`,
          courseHiring.newCourseHiringId,
        ])
      )

      if (newHiring.committee) {
        for (const memberId of newHiring.committee) {
          for (const id of newCourseHiringIds) {
            await db.insert(accountsPerHiring).values({
              accountId: memberId,
              hiringType: 'candidate',
              courseHiringId: id.newCourseHiringId,
            })
          }
        }
      }

      const requirements: CourseHiringRequirementsSchema[] = []
      newHiring.courses.forEach((course) => {
        course.requirements.forEach((requirement) => {
          requirements.push({
            courseHiringId: mapCourseHiringId.get(
              `${newHiringId}-${course.id}`
            )!,
            detail: requirement.detail,
          })
        })
      })

      await tx.insert(courseHiringRequirements).values(requirements)
    })
  }

  public async updateHiringSelectionStatus(
    jobRequestId: number,
    newStatus: 'sent' | 'rejected' | 'to_evaluate' | 'evaluated' | 'selected',
    evaluatorId: string,
    observation?: string | undefined,

    evaluationList?: {
      courseHiringRequirementId: string
      score: number
    }[]
  ): Promise<void> {
    // 1. Obtener el estado actual de la jobRequest
    const [existingJobRequest] = await db
      .select({ state: jobRequests.state })
      .from(jobRequests)
      .where(eq(jobRequests.id, jobRequestId))

    if (!existingJobRequest) {
      throw new JobRequestNotFoundError('La propuesta de inscripción no existe')
    }

    // 2. Validar el cambio de estado
    const validTransitions: { [key: string]: string[] } = {
      sent: ['rejected', 'to_evaluate'],
      rejected: ['to_evaluate'],
      to_evaluate: ['evaluated'],
      evaluated: ['selected'],
      selected: [], // No permite ninguna transición posterior
    }

    const currentState = existingJobRequest.state
    if (!validTransitions[currentState].includes(newStatus)) {
      throw new InvalidStatusChangeError(
        `No se puede cambiar el estado de ${currentState} a ${newStatus}`
      )
    }

    // 3. Actualizar el estado si es válido
    await db
      .update(jobRequests)
      .set({ state: newStatus, observation: observation })
      .where(eq(jobRequests.id, jobRequestId))

    //4. Hacer el barrido de los puntajes si existe la lista de puntajes.
    if (evaluationList != undefined) {
      if (evaluationList.length > 0) {
        const currentDate = new Date() // fecha actual

        await Promise.all(
          evaluationList.map(async (evaluation) => {
            const existingEvaluations = await db
              .select()
              .from(evaluations)
              .where(
                and(
                  eq(evaluations.jobRequestId, jobRequestId),
                  eq(
                    evaluations.requirementPerCourseId,
                    evaluation.courseHiringRequirementId
                  )
                )
              )

            if (existingEvaluations.length > 0) {
              return db
                .update(evaluations)
                .set({
                  score: evaluation.score.toFixed(2), // Round to 2 decimals
                  evaluationDate: currentDate.toISOString(), // Use current date
                  evaluatorId: evaluatorId,
                })
                .where(
                  and(
                    eq(evaluations.jobRequestId, jobRequestId),
                    eq(
                      evaluations.requirementPerCourseId,
                      evaluation.courseHiringRequirementId
                    )
                  )
                )
            } else {
              return db.insert(evaluations).values({
                jobRequestId: jobRequestId,
                requirementPerCourseId: evaluation.courseHiringRequirementId,
                score: evaluation.score.toFixed(2), // Round to 2 decimals
                evaluationDate: currentDate.toISOString(), // Use current date
                evaluatorId: evaluatorId,
              })
            }
          })
        )
      }
    }
  }

  public async getHiringRequirements(
    hiringId: number,
    courseId: number
  ): Promise<CourseHiringRequirementsSchema[]> {
    const [courseHiringId] = await db
      .select({ id: courseHirings.id })
      .from(courseHirings)
      .where(
        and(
          eq(courseHirings.courseId, courseId),
          eq(courseHirings.hiringId, hiringId)
        )
      )
      .limit(1)

    const requirements = await db
      .select()
      .from(courseHiringRequirements)
      .where(eq(courseHiringRequirements.courseHiringId, courseHiringId.id))

    const requirementList = requirements.map((requirement) => ({
      id: requirement.id,
      detail: requirement.detail,
      courseHiringId: requirement.courseHiringId,
      step: requirement.step,
    }))

    return requirementList
  }

  public async getCandidateHiringList(
    hiringId: number,
    courseHiringId: number,
    step: 'first' | 'second' | 'selected'
  ): Promise<
    (Pick<AccountsSchema, 'id' | 'name' | 'email'> & {
      jobRequestStatus: JobRequestsSchema['state']
      jobRequestId: JobRequestsSchema['id']
    })[]
  > {
    // 1. Obtener si existe el course Hiring
    const [existingCourseHiring] = await db
      .select()
      .from(courseHirings)
      .where(
        and(
          eq(courseHirings.hiringId, hiringId),
          eq(courseHirings.courseId, courseHiringId)
        )
      )

    if (!existingCourseHiring) {
      throw new CourseHiringNotFoundError('La convocatoria del curso no existe')
    }

    let statusFilter: NonNullable<JobRequestsSchema['state']>[]

    if (step === 'first') {
      statusFilter = ['sent', 'rejected']
    } else if (step === 'second') {
      statusFilter = ['to_evaluate', 'evaluated']
    } else {
      statusFilter = ['selected']
    }
    const candidateListQuery = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
        jobRequestStatus: jobRequests.state,
        jobRequestId: jobRequests.id,
      })
      .from(accounts)
      .innerJoin(jobRequests, eq(jobRequests.accountId, accounts.id))
      .innerJoin(
        courseHirings,
        eq(jobRequests.courseHiringId, courseHirings.id)
      )
      .where(
        and(
          eq(courseHirings.id, existingCourseHiring.id),
          inArray(jobRequests.state, statusFilter)
        )
      )
    //TODO falta reflejar los cambios a la bd, aun no puede diferenciar entre distintos cursos
    const candidateList = candidateListQuery.map((candidate) => ({
      accountId: candidate.id,
      name: `${candidate.name} ${candidate.firstSurname} ${candidate.secondSurname}`,
      email: candidate.email,
      jobRequestStatus: candidate.jobRequestStatus,
      jobRequestId: +candidate.jobRequestId,
    }))

    return candidateList
  }

  public async getCandidateMotivationAndObservation(
    applicationId: number
  ): Promise<{
    motivation: string | null
    observation: string | null
    documentsId: string | null
  }> {
    const data = await db
      .select({
        motivation: jobRequests.motivation,
        observation: jobRequests.observation,
        documentsId: jobRequests.requirementUrl,
      })
      .from(jobRequests)
      .where(eq(jobRequests.id, applicationId))
      .limit(1)
    return data[0]
  }

  public async getRequirementsScores(
    jobRequestId: number
  ): Promise<{ id: string | null; detail: string | null; score: number }[]> {
    const scores = await db
      .select({
        id: evaluations.requirementPerCourseId,
        score: evaluations.score,
        detail: courseHiringRequirements.detail,
      })
      .from(evaluations)
      .innerJoin(
        courseHiringRequirements,
        eq(evaluations.requirementPerCourseId, courseHiringRequirements.id)
      )
      .where(eq(evaluations.jobRequestId, jobRequestId))

    return scores.map((req) => ({
      id: req.id,
      score: Number(req.score) ?? 0,
      detail: req.detail,
    }))
  }

  public async getJobRequestDetail(
    courseHiringId: string,
    accountId: string
  ): Promise<{
    candidateName: string
    candidateLastname: string
    candidateEmail: string
    jrUrl: string
    jrMotivation: string
    jrState: typeof jobRequestState
    jrObservation: string
    requirementAndHisEvaluationList: {
      requirementDetail: string
      requirementStep: typeof courseStep
      score: number
      evaluationDate: Date
      evaluatorName: string
      evaluatorLastname: string
    }[]
  }> {
    const result = await db
      .select({
        candidateName: accounts.name,
        candidateEmail: accounts.email,
        candidateLastname: sql`${accounts.firstSurname} || ' ' || ${accounts.secondSurname}`,
        jrUrl: jobRequests.requirementUrl,
        jrMotivation: jobRequests.motivation,
        jrState: jobRequests.state,
        jrObservation: jobRequests.observation,
        jrId: jobRequests.id,
      })
      .from(accounts)
      .innerJoin(jobRequests, eq(accounts.id, jobRequests.accountId))
      .where(
        and(
          eq(accounts.id, accountId),
          eq(jobRequests.courseHiringId, courseHiringId)
        )
      )

    const result2 = await db
      .select({
        requirementDetail: courseHiringRequirements.detail,
        requirementStep: courseHiringRequirements.step,
        score: evaluations.score,
        evaluationDate: evaluations.evaluationDate,
        evaluatorName: accounts.name,
        evaluatorLastname: sql`${accounts.firstSurname} || ' ' || ${accounts.secondSurname}`,
      })
      .from(evaluations)
      .innerJoin(
        courseHiringRequirements,
        eq(evaluations.requirementPerCourseId, courseHiringRequirements.id)
      )
      .innerJoin(accounts, eq(accounts.id, evaluations.evaluatorId))
      .where(eq(evaluations.jobRequestId, result[0].jrId))

    return {
      candidateName: result[0].candidateName,
      candidateLastname: result[0].candidateLastname as string,
      candidateEmail: result[0].candidateEmail,
      jrUrl: result[0].jrUrl ?? '',
      jrMotivation: result[0].jrMotivation ?? '',
      jrState: result[0].jrState as unknown as typeof jobRequestState,
      jrObservation: result[0].jrObservation ?? '',
      requirementAndHisEvaluationList: result2.map((item) => ({
        requirementDetail: item.requirementDetail ?? '',
        requirementStep: item.requirementStep as unknown as typeof courseStep,
        score: item.score ? parseFloat(item.score) : 0,
        evaluationDate: item.evaluationDate
          ? new Date(item.evaluationDate)
          : new Date(),
        evaluatorName: item.evaluatorName,
        evaluatorLastname: item.evaluatorLastname as string,
      })),
    }
  }
  public async getJobRequest(jobRequestId: number): Promise<JobRequestsSchema> {
    const result = await db
      .select({
        candidateName: accounts.name,
        candidateEmail: accounts.email,
        candidateId: accounts.id,
        candidateLastname: sql`${accounts.firstSurname} || ' ' || ${accounts.secondSurname}`,
        jrUrl: jobRequests.requirementUrl,
        jrMotivation: jobRequests.motivation,
        jrState: jobRequests.state,
        jrObservation: jobRequests.observation,
        jrId: jobRequests.id,
        hiringId: jobRequests.courseHiringId,
      })
      .from(accounts)
      .innerJoin(jobRequests, eq(accounts.id, jobRequests.accountId))
      .where(and(eq(jobRequests.id, jobRequestId)))

    return {
      accountId: result[0].candidateId,
      id: result[0].jrId,
      state: result[0].jrState,
      observation: result[0].jrObservation,
      motivation: result[0].jrMotivation ?? '',
      courseHiringId: result[0].hiringId ?? '',
      requirementUrl: result[0].jrUrl,
    }
  }

  public async putNewJobRequest(params: {
    candidateAccount: string
    jrMotivation: string | undefined
    courseHiringId: string
    file: string
  }): Promise<void> {
    const verification = await db
      .select()
      .from(jobRequests)
      .where(
        and(
          eq(jobRequests.courseHiringId, params.courseHiringId),
          eq(jobRequests.accountId, params.candidateAccount)
        )
      )

    if (verification.length == 0) {
      await db.insert(jobRequests).values({
        accountId: params.candidateAccount,
        motivation: params.jrMotivation,
        courseHiringId: params.courseHiringId,
        requirementUrl: params.file,
        state: 'sent',
      })
      await db.insert(accountsPerHiring).values({
        accountId: params.candidateAccount,
        courseHiringId: params.courseHiringId,
        hiringType: 'candidate',
      })
    }
  }

  public async getHiringsWithCoursesByUnit(
    unitId: number,
    accountId: string,
    filters: GetHiringsWithCoursesQueryDTO
  ): Promise<HiringsWithCoursesDTO[]> {
    const { q = '', page, limit } = filters
    const offset = page * limit
    // Perform a SELECT query with JOINS
    console.log(accountId)
    const rows = await db
      .select({
        hiringId: hirings.id,
        hiringDescription: hirings.description,
        hiringStatus: hirings.status,
        hiringEndDate: hirings.endDate,
        processId: hirings.id,
        courseId: courses.id,
        courseName: courses.name,
      })
      .from(hirings)
      .leftJoin(courseHirings, eq(courseHirings.hiringId, hirings.id))
      .leftJoin(courses, eq(courses.id, courseHirings.courseId))
      .leftJoin(
        accountsPerHiring,
        eq(accountsPerHiring.courseHiringId, courseHirings.id)
      )
      .where(
        and(
          ilike(hirings.description, `%${q}%`),
          notInArray(accountsPerHiring.hiringType, ['candidate']),
          eq(accountsPerHiring.accountId, accountId)
        )
      )
      .limit(limit)
      .offset(offset)

    // Now we need to regroup the flat data into a nested structure
    const hiringsMap = new Map()

    for (const row of rows) {
      let hiring = hiringsMap.get(row.hiringId)
      if (!hiring) {
        hiring = {
          id: row.hiringId,
          name: row.hiringDescription,
          status: row.hiringStatus,
          endDate: row.hiringEndDate,
          courses: [],
        }
        hiringsMap.set(row.hiringId, hiring)
      }

      if (row.courseId) {
        hiring.courses.push({
          id: row.courseId,
          name: row.courseName,
          processId: row.processId,
        })
      }
    }

    const hiringsWithCourses = Array.from(hiringsMap.values())
    return hiringsWithCourses
  }

  public async getJobRequests(accountId: string): Promise<
    {
      jrState: typeof jobRequestState
      courseHiringId: string | null
      jrId: number
    }[]
  > {
    const result = await db
      .select({
        jrState: jobRequests.state,
        courseHiringId: jobRequests.courseHiringId,
        jrId: jobRequests.id,
      })
      .from(accounts)
      .innerJoin(jobRequests, eq(accounts.id, jobRequests.accountId))
      .where(eq(accounts.id, accountId))

    return result.map((req) => ({
      jrState: req.jrState as unknown as typeof jobRequestState,
      courseHiringId: req.courseHiringId,
      jrId: req.jrId,
    }))
  }
}

export default HiringSelectionService
