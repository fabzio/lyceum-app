import { Account } from '@/interfaces/models/Account'

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

  toggleLead: (
    id: string,
    courseCode: string,
    scheduleCode: number
  ) => Promise<void>
  getAccountSchedules: (accountId: Account['id']) => Promise<
    {
      id: number
      code: string
      courseName: string
    }[]
  >

  getAccountSchedulesAsStudent: (accountId: Account['id']) => Promise<
    {
      id: number
      code: string
      courseName: string
    }[]
  >

  insertStudentsInCourse(
    courseCode: string,
    students: { studentCode: string; scheduleCode: string }[]
  ): Promise<void>
}
