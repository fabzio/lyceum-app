import http from '@frontend/lib/http'
import { StudyPlan } from '../../../interfaces/models/StudyPlan'
import { isAxiosError } from 'axios'
import { Unit } from '@frontend/interfaces/models/Unit'
import { Course } from '@frontend/interfaces/models/Course'

/*
import http from '@frontend/lib/http';


class StudyPlanService {
  static async fetchStudyPlans(): Promise<StudyPlan[]> {
    const res = await http.get('/study-plans');
    return res.data as StudyPlan[];
  }
}

export default StudyPlanService;
*/

class StudyPlanService {
  static async createStudyPlan({
    specialityId,
    startLevel,
    levelsCount,
    description,
  }: {
    specialityId: Unit['id']
    startLevel: number
    levelsCount: number
    description: string
  }): Promise<StudyPlan['id']> {
    try {
      const res = await http.post(`/study-plan/plan-management`, {
        specialityId,
        startLevel,
        levelsCount,
        description,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      const studyPlanId = response.data as StudyPlan['id']
      return studyPlanId
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }
  static async getStudyPlans(specialityId: Unit['id']): Promise<StudyPlan[]> {
    try {
      const res = await http.get(`/study-plan/plan-management`, {
        params: {
          specialityId,
        },
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      const studyPlans = response.data as StudyPlan[]
      return studyPlans
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }

  static async getStudyPlanDetail(
    studyPlanId: StudyPlan['id']
  ): Promise<StudyPlan> {
    try {
      const res = await http.get(`/study-plan/plan-management/${studyPlanId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      const studyPlan = response.data as StudyPlan
      return studyPlan
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }

  static async getStudyPlanCourses(studyPlanId: StudyPlan['id']): Promise<
    {
      course: Course
      level: number
    }[]
  > {
    try {
      const res = await http.get(
        `/study-plan/plan-management/${studyPlanId}/courses`
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      const studyPlan = response.data as {
        course: Course
        level: number
      }[]
      return studyPlan
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }

  static async addCoursesToStudyPlan(
    coursesList: {
      level: number
      studyPlanId: StudyPlan['id']
      course: Course['code'] | Course['id']
    }[]
  ): Promise<void> {
    try {
      const res = await http.post(
        `/study-plan/plan-management/${coursesList[0].studyPlanId}/courses`,
        coursesList
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }

  static async editCourseStudyPlan({
    courseId,
    studyPlanId,
    level,
  }: {
    studyPlanId: StudyPlan['id']
    courseId: Course['id']
    level: number
  }): Promise<void> {
    try {
      const res = await http.put(
        `/study-plan/plan-management/${studyPlanId}/courses/${courseId}`,
        {
          level,
        }
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }

  static async deleteCourseFromStudyPlan({
    courseId,
    studyPlanId,
  }: {
    studyPlanId: StudyPlan['id']
    courseId: Course['id']
  }): Promise<void> {
    try {
      const res = await http.delete(
        `/study-plan/plan-management/${studyPlanId}/courses/${courseId}`
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }

  static async updateStudyPlanState(
    studyPlanId: number,
    data: { active?: boolean; state?: string }
  ): Promise<void> {
    try {
      const res = await http.put(
        `/study-plan/plan-management/${studyPlanId}/state`,
        data
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }
}

export default StudyPlanService
