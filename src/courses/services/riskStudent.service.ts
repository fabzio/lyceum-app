import http from '@/lib/http'
import { RiskStudentGeneral } from '../interfaces/RIskStudentGeneral'
import { Account } from '@/interfaces/Account'
import { Schedule } from '@/interfaces/Schedule'
import { RiskStudentReport } from '../interfaces/RiskStudentReport'
import { Courses } from '@/interfaces/Courses'

class RiskStudentService {
  public static async getRiskStudents(): Promise<RiskStudentGeneral[]> {
    try {
      const res = await http.get('/courses/risk-students')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as RiskStudentGeneral[]
    } catch (error) {
      console.error(error)
      return []
    }
  }

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

  public static async insertRiskStudentReport(
    studentList: {
      studentCode: Account['code']
      scheduleCode: Schedule['code']
      courseCode: Courses['code']
      reasonId: number
      score: number
    }[]
  ): Promise<void> {
    try {
      const res = await http.post('/courses/risk-students', {
        studentList,
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

export default RiskStudentService
