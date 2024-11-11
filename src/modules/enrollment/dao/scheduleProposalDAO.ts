import { Proposal } from '@/interfaces/models/Proposal'
import { PaginatedData } from '@/interfaces/PaginatedData'

export interface ScheduleProposalDAO {
  insertCourseToScheduleProposal(
    enrollmentProposalId: number,
    coursesList: {
      courseId: number
      vacanciesPerSchema: number
      visibleSchedules: number
      hiddenSchedules: number
    }[]
  ): Promise<void>

  updateScheduleProposalStatus(
    enrollmentProposalId: number,
    newStatus: 'requested' | 'sended' | 'aproved' | 'assigned'
  ): Promise<void>

  insertScheduleProposal(
    facultyId: number,
    accountId: string,
    termId: number
  ): Promise<void>

  getScheduleProposalsInUnit(params: {
    unitId: number
    page: number
    limit: number
    sortBy?: string
  }): Promise<
    PaginatedData<{
      id: number
      speciality: {
        id: number
        name: string
      }
      termId: number
      state: 'requested' | 'sended' | 'aproved' | 'assigned'
      createdAt: Date | null
    }>
  >

  updateCoursesInScheduleProposal(
    enrollmentProposalId: number,
    coursesList: {
      courseId: number
      vacanciesPerSchema: number
      visibleSchedules: number
      hiddenSchedules: number
    }[]
  ): Promise<void>

  getProposal(reqeustId: number): Promise<Partial<Proposal>>

  getCoursesProposal(params: {
    proposalID: number
    page: number
    limit: number
    sortBy?: string
  }): Promise<PaginatedData<{
    proposalID: number
    courseId: number
    courseCode: string
    courseName: string
    vacants: number
    numberVisible: number
    numberHidden: number
  }> | null>

  deleteCoursesInScheduleProposal(
    enrollmentProposalId: number,
    coursesList: number[]
  ): Promise<void>
}

export default ScheduleProposalDAO
