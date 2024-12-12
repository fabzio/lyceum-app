import { EnrollmentModificationsSchema } from '@/database/schema/enrollmentModifications'
import { Account } from '@/interfaces/models/Account'
import { Unit } from '@/interfaces/models/Unit'
import { PaginatedData } from '@/interfaces/PaginatedData'
//import { Course } from '@/interfaces/models/Course'

export interface EnrollmentModificationDAO {
  getAllEnrollmentsOfSpeciality: (filters: {
    q?: string
    page: number
    limit: number
    sortBy?: string
    specialityId: Unit['id']
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
    observation,
  }: Pick<
    EnrollmentModificationsSchema,
    'requestNumber' | 'state' | 'observation'
  >): Promise<void>

  createEnrollmentRequest({
    reason,
    requestType,
    scheduleId,
    studentId,
  }: Omit<EnrollmentModificationsSchema, 'requestNumber' | ''>): Promise<
    EnrollmentModificationsSchema['requestNumber']
  >
  getStudentEnrollments: ({
    studentId,
    page,
    limit,
    sortBy,
  }: {
    studentId: Account['id']
    page: number
    limit: number
    sortBy?: string
  }) => Promise<
    PaginatedData<{
      requestNumber: number
      state: string
      requestType: string
      schedule: {
        code: string
        courseName: string
      }
      reason: string | null
    }>
  >
}
