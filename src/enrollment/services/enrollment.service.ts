import http from '@/lib/http'
import { EnrollmentGeneral } from '../interfaces/EnrollmentGeneral'
//import { Account } from '@/interfaces/Account'
//import { Schedule } from '@/interfaces/Schedule'
//import { RiskStudentReport } from '../interfaces/RiskStudentReport'

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
  /*
  public static async getRiskStudentReports({
    studentCode,
    scheduleId,
  }: {
    studentCode: Account['code']
    scheduleId: Schedule['id']
  }): Promise<RiskStudentReport[]> {
    try {
      const res = await http.get(`/courses/risk-students/${studentCode}`, {
        params: {
          scheduleId,
        },
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as RiskStudentReport[]
    } catch (error) {
      console.error(error)
      return []
    }
  }
    */
}

export default EnrollmentService