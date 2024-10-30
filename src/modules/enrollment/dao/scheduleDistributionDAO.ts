export interface ScheduleDistributionDAO {
  insertProfessorsToSchedule(
    scheduleId: number,
    professorsList: {
      professorId: string
      islead: boolean
    }[]
  ): Promise<void>
}

export default ScheduleDistributionDAO
