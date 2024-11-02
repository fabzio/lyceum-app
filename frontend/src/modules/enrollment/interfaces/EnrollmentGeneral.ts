import { Account } from '@frontend/interfaces/models/Account'
//a revisar
export interface EnrollmentGeneral {
  student: {
    name: Account['name']
    code: Account['code']
    speciality: string
    faculty: string
  }
  schedule: {
    code: string
    courseCode: string
    courseName: string
  }
  requestType: 'aditional' | 'withdrawal'
  requestNumber: number
  state: 'denied' | 'approved' | 'requested'
  reason: string
}
