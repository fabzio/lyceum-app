import { Schedule } from '@frontend/interfaces/models/Schedule'

export type CourseSchedule = {
  name: string
  id: number
  code: string
  schedules: Schedule[]
}
