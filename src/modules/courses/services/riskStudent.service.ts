import http from '@/lib/http'
import { RiskStudentGeneral } from '../interfaces/RIskStudentGeneral'
import { Account } from '@/interfaces/models/Account'
import { Schedule } from '@/interfaces/models/Schedule'
import { RiskStudentReport } from '../interfaces/RiskStudentReport'
import { Course } from '@/interfaces/models/Course'
import axios from 'axios'
import { getRiskStudentDetail } from '../interfaces/RiskStudentDetail'

class RiskStudentService {
  public static async getRiskStudents(): Promise<RiskStudentGeneral[]> {
    try {
      const res = await http.get('/courses/risk-students')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as RiskStudentGeneral[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getRiskStudentDetail({
    studentCode,
    scheduleId,
  }: {
    studentCode: Account['code']
    scheduleId: Schedule['id']
  }): Promise<getRiskStudentDetail> {
    try {
      const res = await http.get(`/courses/risk-students/${studentCode}`, {
        params: {
          scheduleId,
        },
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as getRiskStudentDetail
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
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
      const res = await http.get(
        `/courses/risk-students/${studentCode}/reports`,
        {
          params: {
            scheduleId,
          },
        }
      )
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
      courseCode: Course['code']
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

  public static async updateRiskStudentReport(): Promise<void> {
    try {
      const res = await http.put('/courses/risk-students')
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
