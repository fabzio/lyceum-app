import db from '@/database'
import { enrollmentProposal } from '@/database/schema'
import { eq, and } from 'drizzle-orm'
import { AlreadyApprovedError, NoPreviousinSentStateError } from '../errors'
import EnrollmentApprovalDAO from '../dao/enrollmentApprovalDAO'

class EnrollmentApprovalService implements EnrollmentApprovalDAO {
  public async changeSentToApproved(enrollmentProposalId: number) {
    //verificamos si no esta ya aprobado
    const existingEnrollmentProposal = await db
      .select()
      .from(enrollmentProposal)
      .where(and(eq(enrollmentProposal.id, enrollmentProposalId)))
      .limit(1)

    // Si existe un curso con el estado "approved", lanzamos un error
    if (existingEnrollmentProposal[0].state === 'aproved') {
      throw new AlreadyApprovedError(
        `La propuesta de matricula con ID ${enrollmentProposalId} ya ha sido aprobado anteriormente.`
      )
    }
    if (existingEnrollmentProposal[0].state !== 'sended') {
      throw new NoPreviousinSentStateError(
        `La propuesta de matricula con ID ${enrollmentProposalId} no se encuentra en estado "sended".`
      )
    }

    // cambiamos el estado a aprobado

    await db
      .update(enrollmentProposal)
      .set({ state: 'aproved' })
      .where(eq(enrollmentProposal.id, enrollmentProposalId))
  }
}

export default EnrollmentApprovalService
