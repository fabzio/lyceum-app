import { EnrollmentModificationsSchema } from '@/database/schema/enrollmentModifications'
import { Account } from '@/interfaces/models/Account'
import { PaginatedData } from '@/interfaces/PaginatedData'
//import { Course } from '@/interfaces/models/Course'

export interface EnrollmentModificationDAO {
  getAllEnrollments: (filters: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }) => Promise<
    PaginatedData<{
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
  >

  getEnrollmentRequest: (params: { requestNumber: number }) => Promise<{
    student: {
      name: Account['name']
      code: Account['code']
    }
    schedule: {
      code: string
      courseCode: string
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
  
  createEnrollmentRequest({
    reason,
    requestType,
    scheduleId,
    studentId,
  }: Omit<EnrollmentModificationsSchema, 'requestNumber' | ''>): Promise<
    EnrollmentModificationsSchema['requestNumber']
  >
}
