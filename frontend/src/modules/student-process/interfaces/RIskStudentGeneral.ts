import { Account } from '@frontend/interfaces/models/Account'
import { Course } from '@frontend/interfaces/models/Course'
import { Schedule } from '@frontend/interfaces/models/Schedule'

export interface RiskStudentGeneral {
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
  reason: string
  score: number
  state: boolean
}
