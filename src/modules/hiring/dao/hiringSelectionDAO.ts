import { AccountsSchema } from '@/database/schema/accounts'
import { JobRequestsSchema } from '@/database/schema/jobRequests'
import { CourseHiringRequirementsSchema } from '@/database/schema/courseHiringRequirements'
import { courseStep, jobRequestState } from '@/database/schema/enums'
import {
  CreateHiringSelectionPropDTO,
  GetHiringsWithCoursesQueryDTO,
  HiringsWithCoursesDTO,
} from '../dtos/hiringSelectionDTO'

export interface HiringSelectionDAO {
  createHiringSelection(newHiring: CreateHiringSelectionPropDTO): Promise<void>

  updateHiringSelectionStatus(
    jobRequestId: number,
    newStatus: 'sent' | 'rejected' | 'to_evaluate' | 'evaluated' | 'selected',
    observation: string | undefined,

    evaluationList: {
      courseHiringRequirementId: string
      score: number
    }[]
  ): Promise<void>

  getCandidateHiringList(
    hiringId: number,
    courseHiringId: number,
    step: 'first' | 'second' | 'selected'
  ): Promise<
    (Pick<AccountsSchema, 'id' | 'name' | 'email'> & {
      jobRequestStatus: JobRequestsSchema['state']
      jobRequestId: JobRequestsSchema['id']
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

  getHiringsWithCoursesByUnit(
    unitId: number,
    filters: GetHiringsWithCoursesQueryDTO
  ): Promise<HiringsWithCoursesDTO[]>

  getCandidateMotivationAndObservation(
    applicationId: number
  ): Promise<{ motivation: string | null; observation: string | null }>

  getHiringRequirements(
    hiringId: number,
    courseId: number
  ): Promise<CourseHiringRequirementsSchema[]>

  getJobRequests(accountId: string): Promise<
    {
      jrState: typeof jobRequestState
      courseHiringId: string | null
    }[]
  >

  getRequirementsScores(
    jobRequestId: number
  ): Promise<{ id: string | null; detail: string | null; score: number }[]>
}

export default HiringSelectionDAO
