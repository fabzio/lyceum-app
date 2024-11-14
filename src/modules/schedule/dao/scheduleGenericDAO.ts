//import { Course } from '@/interfaces/models/Course'
export interface ScheduleGenericDAO {
  fetchSchedulesByCourse: (courseId: number) => Promise<
    {
      id: number
      code: string
      termId: number
      state: 'saved' | 'editing'
      visibility: boolean
    }[]
  >
  assignJP: (scheduleId: number, accountId: string) => Promise<void>

  deleteJP: (id: string) => Promise<void>

  toggleLead: (id: string) => Promise<void>
}
