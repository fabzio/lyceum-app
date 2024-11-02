import http from '@frontend/lib/http'
import { EnrollmentGeneral } from '../interfaces/EnrollmentGeneral'
import axios from 'axios'
import { Account } from '@frontend/interfaces/models/Account'

class EnrollmentService {
  public static async getAllEnrollments(): Promise<EnrollmentGeneral[]> {
    try {
      const res = await http.get('/enrollment/modifications')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as EnrollmentGeneral[]
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public static async getEnrollment({
    requestId,
  }: {
    requestId: EnrollmentGeneral['requestNumber']
  }): Promise<EnrollmentGeneral> {
    try {
      const res = await http.get(`/enrollment/modifications/${requestId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as EnrollmentGeneral
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get enrollment request data')
    }
  }

  public static async updateEnrollment({
    requestNumber,
    state,
  }: Pick<EnrollmentGeneral, 'state' | 'requestNumber'>) {
    try {
      const res = await http.put(`/enrollment/modifications/${requestNumber}`, {
        state,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as EnrollmentGeneral
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update enrollment request data')
    }
  }

  public static async createEnrollmentModification({
    scheduleId,
    reason,
    requestType,
    studentId,
  }: {
    studentId: Account['id']
    scheduleId: number
    requestType: 'aditional' | 'withdrawal'
    reason: string
  }) {
    try {
      const res = await http.post('/enrollment/modifications', {
        scheduleId,
        reason,
        requestType,
        studentId,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as EnrollmentGeneral
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default EnrollmentService
