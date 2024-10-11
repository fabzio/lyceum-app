import { EnrollmentModificationsSchema } from '@/database/schema/enrollmentModifications'
import { Account } from '@/interfaces/models/Account'
//import { Course } from '@/interfaces/models/Course'

export interface EnrollmentModificationDAO {
  getAllEnrollments: () => Promise<
    {
      student: {
        name: Account['name']
        surname: string
      }
      schedule: {
        code: string
        courseName: string
      }
      state: string
      requestType: string
      reason: string | null
      requestNumber: number
    }[]
  >

  getEnrollmentRequest: (params: { requestNumber: number }) => Promise<{
    student: {
      name: Account['name']
      surname: string
    }
    schedule: {
      code: string
      courseName: string
    }
    state: string
    requestType: string
    reason: string | null
    requestNumber: number
  }>

  updateEnrollmentRequestResponse({
    requestNumber,
    state,
  }: Pick<
    EnrollmentModificationsSchema,
    'requestNumber' | 'state'
  >): Promise<void>
}
