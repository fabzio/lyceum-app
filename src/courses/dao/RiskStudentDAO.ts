import { Account } from '@/interfaces/models/Account'
import { Course } from '@/interfaces/models/Course'
import { RiskStudent } from '@/interfaces/models/RiskStudent'
import { Schedule } from '@/interfaces/models/Schedule'

export interface RiskStudentDAO {
  getAllRiskStudent: () => Promise<
    {
      student: {
        code: Account['code']
        name: Account['name']
        surname: string
        email: Account['email']
      }
      course: {
        code: Course['code']
        name: Course['name']
      }
      schedule: {
        id: Schedule['id']
        code: Schedule['code']
        professor: string
      }
      score: number
      reason: string
    }[]
  >
  getRiskStudentReports: (params: {
    studentCode: string
    scheduleId: number
  }) => Promise<
    {
      id: number
      date: string
      score: number
    }[]
  >
}
