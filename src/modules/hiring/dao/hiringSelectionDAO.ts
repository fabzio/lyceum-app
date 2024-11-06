import { AccountsSchema } from '@/database/schema/accounts'
import { JobRequestsSchema } from '@/database/schema/jobRequests'

export interface HiringSelectionDAO {
  updateHiringSelectionStatus(
    jobRequestId: number,
    accountId: string,
    newStatus: 'sent' | 'rejected' | 'to_evaluate' | 'evaluated' | 'selected',

    evaluationList: {
      evaluationId: string
      courseHiringRequirementId: string
      score: number
    }[]
  ): Promise<void>

  getCandidateHiringList(
    courseHiringId: string,
    step: 'first' | 'second' | 'selected'
  ): Promise<
    (Pick<AccountsSchema, 'id' | 'name' | 'email'> & {
      jobRequestStatus: JobRequestsSchema['state']
    })[]
  >
}

export default HiringSelectionDAO
