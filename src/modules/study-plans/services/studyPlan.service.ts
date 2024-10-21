import http from '@/lib/http'
import { StudyPlan } from '../../../interfaces/models/StudyPlan'
import { isAxiosError } from 'axios'
import { Unit } from '@/interfaces/models/Unit'

/*
import http from '@/lib/http';


class StudyPlanService {
  static async fetchStudyPlans(): Promise<StudyPlan[]> {
    const res = await http.get('/study-plans');
    return res.data as StudyPlan[];
  }
}

export default StudyPlanService;
*/

class StudyPlanService {
  static async createStudyPlan(
    specialityId: Unit['id']
  ): Promise<StudyPlan['id']> {
    try {
      const res = await http.post(`/study-plan/plan-management`, {
        specialityId,
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
}

export default StudyPlanService
