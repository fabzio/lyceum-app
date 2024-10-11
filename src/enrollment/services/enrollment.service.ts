import http from '@/lib/http'
import { EnrollmentGeneral } from '../interfaces/EnrollmentGeneral'

class EnrollmentService {
  public static async getAllEnrollments(): Promise<EnrollmentGeneral[]> {
    try {
      const res = await http.get('/enrollments/enrollments')
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
      const res = await http.get(`/matricula/${requestId}/`, {
        params: {
          requestId,
        },
      })
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
 
}

export default EnrollmentService