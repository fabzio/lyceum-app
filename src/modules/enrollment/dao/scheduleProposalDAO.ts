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

  insertScheduleProposal(facultyId: number, accountId: string): Promise<void>

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

  getCoursesProposal(proposalId: number) : Promise<{
    id: number
    enrollmentProposalId: number
    courseId: number
    vacanciesPerSchema: number
    hiddenSchedules: number
    visibleSchedules: number
  }[]>
}


export default ScheduleProposalDAO
