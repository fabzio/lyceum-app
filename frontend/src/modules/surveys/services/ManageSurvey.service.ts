import http from '@frontend/lib/http'
import axios from 'axios'
import { Survey } from '../interfaces/Survey'
import { SurveyManagementDetail } from '../views/ManageSurvey/ManageSurveyDetail/interfaces/SurveyManagementDetail'

class SurveyManagementService {
  public static async getSurveysOfSpeciality(params: {
    unitId: number
  }): Promise<Survey[]> {
    try {
      const res = await http.get('/surveys/survey/speciality', { params })
      const response = res.data as ResponseAPI<Survey[]>
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

  public static async createSurvey(params: {
    name: string
    creatorId: string
    unitId: number
    endDate: Date
    surveyType: 'midterm' | 'annual'
    questions: {
      text: string
      type: 'text' | 'multiple' | 'boolean'
    }[]
  }): Promise<void> {
    try {
      const res = await http.post('/surveys/survey', params)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getSurveyResults(
    surveyId: string
  ): Promise<SurveyManagementDetail> {
    try {
      const res = await http.get(`/surveys/survey/${surveyId}/results`)
      const response = res.data as ResponseAPI<SurveyManagementDetail>
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

export default SurveyManagementService
