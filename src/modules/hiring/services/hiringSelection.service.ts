import db from '@/database'
import {
  jobRequests,
  evaluations,
  accounts,
  courseHiringRequirements,
  courseHirings,
} from '@/database/schema'
import { and, eq, inArray, desc, sql, asc } from 'drizzle-orm'

import { HiringSelectionDAO } from '../dao'
import {
  JobRequestNotFoundError,
  InvalidStatusChangeError,
  CourseHiringNotFoundError,
} from '../errors'
import { JobRequestsSchema } from '@/database/schema/jobRequests'
import { AccountsSchema } from '@/database/schema/accounts'
class HiringSelectionService implements HiringSelectionDAO {
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
}

export default HiringSelectionService
