import { Account } from '@/interfaces/models/Account'
//import { Course } from '@/interfaces/models/Course'

export interface EnrollmentDAO {
  getAllEnrollments: () => Promise<
    {
      student: {
        name: Account['name']
        surname: string
      }
      schedule: {
        code: string
        course_name: string
      }
      state: string
      request_type: string
      reason: string
      request_number: number
    }[]
  >

  getEnrollmentRequest: (params: {
    requestId: number
  }) => Promise<
    {
      student: {
        name: Account['name']
        surname: string
      }
      schedule: {
        code: string
        course_name: string
      }
      state: string
      request_type: string
      reason: string
      request_number: number
    }[]
  >
}
