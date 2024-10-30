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
}

export default ScheduleProposalDAO
