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
} from '@/database/schema'
import { and, eq, inArray, desc, sql, asc, or, ilike } from 'drizzle-orm'

import { HiringSelectionDAO } from '../dao'
import {
  JobRequestNotFoundError,
  InvalidStatusChangeError,
  CourseHiringNotFoundError,
} from '../errors'
import { JobRequestsSchema } from '@/database/schema/jobRequests'
import { AccountsSchema } from '@/database/schema/accounts'
import { courseStep, jobRequestState } from '@/database/schema/enums'
import { CreateHiringSelectionPropDTO } from '../dtos/hiringSelectionDTO'
import { HiringNotFoundError } from '../errors/hiringSelection.error'
import { GetHiringsWithCoursesQueryDTO } from '../dtos/hiringSelectionDTO'
import { HiringsWithCoursesDTO } from '../dtos/hiringSelectionDTO'
import { CourseHiringRequirementsSchema } from '@/database/schema/courseHiringRequirements'
import groupBy from 'just-group-by'

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
    accountId: string,
    newStatus: 'sent' | 'rejected' | 'to_evaluate' | 'evaluated' | 'selected',

    evaluationList: {
      evaluationId: string
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
      .set({ state: newStatus })
      .where(eq(jobRequests.id, jobRequestId))

    //4. Hacer el barrido de los puntajes si existe la lista de puntajes.
    if (evaluationList.length > 0) {
      const currentDate = new Date() // fecha actual

      await Promise.all(
        evaluationList.map((evaluation) =>
          db
            .update(evaluations)
            .set({
              score: evaluation.score.toFixed(2), // redondea a 2 decimales
              evaluationDate: currentDate.toISOString(), // usa la fecha actual
            })
            .where(eq(evaluations.id, Number(evaluation.evaluationId)))
        )
      )
    }
  }

  public async getCandidateHiringList(
    courseHiringId: string,
    step: 'first' | 'second' | 'selected'
  ): Promise<
    (Pick<AccountsSchema, 'id' | 'name' | 'email'> & {
      jobRequestStatus: JobRequestsSchema['state']
    })[]
  > {
    // 1. Obtener si existe el course Hiring
    const [existingCourseHiring] = await db
      .select()
      .from(courseHirings)
      .where(eq(courseHirings.id, courseHiringId))

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
      })
      .from(accounts)
      .innerJoin(jobRequests, eq(jobRequests.accountId, accounts.id))
      .innerJoin(
        courseHirings,
        eq(jobRequests.courseHiringId, courseHirings.id)
      )
      .where(
        and(
          eq(courseHirings.id, courseHiringId),
          inArray(jobRequests.state, statusFilter)
        )
      )
    //TODO falta reflejar los cambios a la bd, aun no puede diferenciar entre distintos cursos
    const candidateList = candidateListQuery.map((candidate) => ({
      accountId: candidate.id,
      name: `${candidate.name} ${candidate.firstSurname} ${candidate.secondSurname}`,
      email: candidate.email,
      jobRequestStatus: candidate.jobRequestStatus,
    }))

    return candidateList
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
  public async getHiringsWithCoursesByUnit(
    unitId: number,
    filters: GetHiringsWithCoursesQueryDTO
  ): Promise<HiringsWithCoursesDTO[]> {
    const { q = '', page, limit } = filters
    const offset = page * limit
    const hiringsWithCourses = await db.query.hirings.findMany({
      columns: {
        createdIn: false,
      },
      where: ilike(hirings.description, `%${q}%`),
      with: {
        courses: {
          with: {
            course: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      limit: limit,
      offset: offset,
    })

    return hiringsWithCourses.map((hiring) => ({
      id: hiring.id,
      name: hiring.description,
      status: hiring.status,
      endDate: hiring.endDate,
      courses: hiring.courses.map((courseHiring) => ({
        id: courseHiring.course!.id,
        name: courseHiring.course!.name,
      })),
    }))
  }
}

export default HiringSelectionService
