import { Unit } from '@frontend/interfaces/models/Unit'
import http from '@frontend/lib/http'
import axios from 'axios'
import { CourseSchedule } from '../views/EnrollmentDistribution/interfaces/CourseSchedules'
import { Account } from '@frontend/interfaces/models/Account'

class EnrollmenDistributionService {
  public static async getCoursesSchedules({ unitId }: { unitId: Unit['id'] }) {
    try {
      const res = await http.get('/enrollment/schedule-distribution', {
        params: { unitId },
      })
      const response = res.data as ResponseAPI<CourseSchedule[]>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async updateScheduleVisibility({
    scheduleId,
    visibility,
  }: {
    scheduleId: CourseSchedule['id']
    visibility: boolean
  }) {
    try {
      const res = await http.put(
        `/enrollment/schedule-distribution/${scheduleId}`,
        {
          visibility,
        }
      )
      const response = res.data as ResponseAPI<CourseSchedule>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async assignProfessorsToCourses({
    scheduleId,
    professorsList,
  }: {
    scheduleId: CourseSchedule['id']
    professorsList: {
      professorId: Account['id']
      isLead: boolean
    }[]
  }) {
    try {
      const res = await http.post(
        `/enrollment/schedule-distribution/${scheduleId}/professors`,
        {
          professorsList,
        }
      )
      const response = res.data as ResponseAPI<CourseSchedule>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async updateProfessorsInCourse({
    scheduleId,
    professorsList,
  }: {
    scheduleId: CourseSchedule['id']
    professorsList: {
      professorId: Account['id']
      isLead: boolean
    }[]
  }) {
    try {
      const res = await http.put(
        `/enrollment/schedule-distribution/${scheduleId}/professors_update`,
        {
          professorsList,
        }
      )
      const response = res.data as ResponseAPI<CourseSchedule>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default EnrollmenDistributionService
