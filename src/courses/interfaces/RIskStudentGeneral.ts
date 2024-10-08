import { Account } from '@/interfaces/Account'
import { Courses } from '@/interfaces/Courses'
import { Schedule } from '@/interfaces/Schedule'

export interface RiskStudentGeneral {
  student: {
    code: Account['code']
    name: Account['name']
    surname: string
    email: Account['email']
  }
  course: {
    code: Courses['code']
    name: Courses['name']
  }
  schedule: {
    id: Schedule['id']
    code: Schedule['code']
    professor: string
  }
  reason: string
  score: number
}
