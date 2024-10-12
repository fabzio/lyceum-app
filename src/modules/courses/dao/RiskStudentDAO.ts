import { Account } from '@/interfaces/models/Account'
import { Course } from '@/interfaces/models/Course'
import { RiskStudent } from '@/interfaces/models/RiskStudent'
import { Schedule } from '@/interfaces/models/Schedule'
import {
  InsertRiskStudentsDTO,
} from '../dto/riskStudentDTO'

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
      score: number | null
      reason: string
    }[]
  >
  getRiskStudentReports: (params: {
    studentCode: string
    scheduleId: number
  }) => Promise<
    {
      id: number
      date: Date
      score: number
    }[]
  >

  insertRiskStudents(list: InsertRiskStudentsDTO['studentList']): Promise<void>
  updateRiskStudents(): Promise<void>
}
