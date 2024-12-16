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

  updateProfessorsInSchedule(
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

  addSchedule({
    courseId,
    code,
    vacancies,
    termId,
  }: {
    courseId: number
    code: string
    vacancies: number
    termId: number
  }): Promise<void>

  deleteSchedule(scheduleId: number): Promise<void>

  deleteProfesorOrJpfromSchedule(
    scheduleId: number,
    professorId: string
  ): Promise<void>
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
