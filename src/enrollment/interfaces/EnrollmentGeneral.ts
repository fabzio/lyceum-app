import { Account } from "@/interfaces/Account"
//a revisar
export interface EnrollmentGeneral {
    student: {
      name: Account['name']
      surname: string
    }
    schedule: {
      code: string
      course_name: string
    }
    requestType: string
    requestNumber: number
    state: string
    reason: string
  }