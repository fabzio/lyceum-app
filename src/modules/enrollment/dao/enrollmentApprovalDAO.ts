export interface EnrollmentApprovalDAO {
  changeSentToApproved(enrollmentProposalId: number): Promise<void>
}

export default EnrollmentApprovalDAO
