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
}

export default ScheduleProposalDAO
