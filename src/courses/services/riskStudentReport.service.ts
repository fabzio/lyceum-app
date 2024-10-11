import http from '@/lib/http'
import { RiskStudentReport } from '../interfaces/RiskStudentReport'

class RiskStudentReportService {
  public static async getRiskStudentReport({
    reportId,
    studentCode,
    scheduleId,
  }: {
    reportId: number | null
    studentCode: string
    scheduleId: number
  }): Promise<RiskStudentReport[]> {
    try {
      const res = await http.get(`/courses/reports/${reportId}`, {
        params: {
          studentCode,
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
  public static async insertRiskStudentReport({
    studentCode,
    scheduleId,
    score,
    observation,
  }: {
    studentCode: string
    scheduleId: number
    score: number
    observation: string
  }): Promise<void> {
    try {
      const res = await http.post('/courses/reports', {
        studentCode,
        scheduleId,
        score,
        observation,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default RiskStudentReportService
