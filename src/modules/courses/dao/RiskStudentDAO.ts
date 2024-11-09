import { Account } from '@/interfaces/models/Account'
import { Course } from '@/interfaces/models/Course'
import { Schedule } from '@/interfaces/models/Schedule'
import { InsertRiskStudentsDTO } from '../dto/riskStudentDTO'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { Unit } from '@/interfaces/models/Unit'

export interface RiskStudentDAO {
  getAllRiskStudentOfSpeciality: ({
    specialityId,
    q,
    page,
    limit,
    sortBy,
  }: {
    specialityId: Unit['id']
    q?: string
    page: number
    limit: number
    sortBy?: string
  }) => Promise<
    PaginatedData<{
      student: {
        code: Account['code']
        name: Account['name']
        surname: string
      }
      course: {
        code: Course['code']
        name: Course['name']
      }
      schedule: {
        id: Schedule['id']
        code: Schedule['code']
      }
      score: number | null
      reason: string
    }>
  >
  getAllRiskStudentOfProfessor({
    professorId,
    q,
    page,
    limit,
    sortBy,
  }: {
    professorId: string
    q?: string
    page: number
    limit: number
    sortBy?: string
  }): Promise<
    PaginatedData<{
      student: {
        code: Account['code']
        name: Account['name']
        surname: string
      }
      course: {
        code: Course['code']
        name: Course['name']
      }
      schedule: {
        id: Schedule['id']
        code: Schedule['code']
      }
      score: number | null
      reason: string
    }>
  >
  getRiskStudentDetail: (params: {
    scheduleId: number
    studentCode: string
  }) => Promise<{
    student: {
      code: Account['code']
      name: Account['name']
      surname: string
    }
    course: {
      code: Course['code']
      name: Course['name']
    }
    schedule: {
      id: Schedule['id']
      code: Schedule['code']
    }
    score: number | null
    reason: string
    state: boolean
  }>
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
  updateRiskStudentsOfFaculty({
    specialityId,
  }: {
    specialityId: Unit['id']
  }): Promise<void>
}
