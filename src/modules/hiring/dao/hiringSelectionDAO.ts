import { AccountsSchema } from '@/database/schema/accounts'
import { JobRequestsSchema } from '@/database/schema/jobRequests'
import { courseStep, jobRequestState } from '@/database/schema/enums'
import { CreateHiringSelectionPropDTO } from '../dtos/hiringSelectionDTO'

export interface HiringSelectionDAO {
  createHiringSelection(newHiring: CreateHiringSelectionPropDTO): Promise<void>

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

  getJobRequestDetail(
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
  }>
}

export default HiringSelectionDAO
