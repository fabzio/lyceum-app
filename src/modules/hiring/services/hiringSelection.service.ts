import db from '@/database'
import { jobRequests, evaluations } from '@/database/schema'
import { and, eq, inArray, desc, sql, asc } from 'drizzle-orm'

import { HiringSelectionDAO } from '../dao'
import { JobRequestNotFoundError, InvalidStatusChangeError } from '../errors'
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
        evaluationList.map(async (evaluation) => {
          await db
            .update(evaluations)
            .set({
              score: evaluation.score.toFixed(2), // redondea a 2 decimales
              evaluationDate: currentDate.toISOString(), // usa la fecha actual
            })
            .where(eq(evaluations.id, Number(evaluation.evaluationId)))
        })
      )
    }
  }
}

export default HiringSelectionService
