import http from '@/lib/http'
import { RiskStudentReport } from '../interfaces/RiskStudentReport'

class getRiskStudentReportService {
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
}

export default getRiskStudentReportService
