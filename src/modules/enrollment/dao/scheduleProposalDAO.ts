import { Proposal } from '@/interfaces/models/Proposal'
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

  getScheduleProposalsInUnit(unitId: number): Promise<
    {
      id: number
      specialityId: number
      termId: number
      state: 'requested' | 'sended' | 'aproved' | 'assigned'
      createdAt: Date | null
    }[]
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

  getProposal(specialityId: number, termId?: number): Promise<Proposal | null>

  getCoursesProposal(proposalId: number): Promise<
    {
      id: number
      enrollmentProposalId: number
      courseId: number
      vacanciesPerSchema: number
      hiddenSchedules: number
      visibleSchedules: number
    }[]
  >

  deleteCoursesInScheduleProposal(
    enrollmentProposalId: number,
    coursesList: {
      courseId: number
    }[]
  ): Promise<void>
}

export default ScheduleProposalDAO
