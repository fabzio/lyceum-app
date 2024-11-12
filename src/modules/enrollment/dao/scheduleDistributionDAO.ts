import { ScheduleSchema } from '@/database/schema/schedules'
import { Unit } from '@/interfaces/models/Unit'

export interface ScheduleDistributionDAO {
  insertProfessorsToSchedule(
    scheduleId: number,
    professorsList: {
      professorId: string
      isLead: boolean
    }[]
  ): Promise<void>
  getCoursesScheduleDistribution(params: {
    unitId: Unit['id']
  }): Promise<CourseSchedule[]>

  updateScheduleVisibility(params: {
    scheduleId: number
    visibility: ScheduleSchema['visibility']
  }): Promise<void>
}

export type CourseSchedule = {
  name: string
  id: number
  code: string
  schedules: {
    id: number
    code: string
    state: 'saved' | 'editing'
    vacancies: number
  }[]
}
export default ScheduleDistributionDAO
