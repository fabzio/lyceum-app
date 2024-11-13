import http from '@frontend/lib/http'
import axios from 'axios'

class SurveyManagementService {
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
}

export default SurveyManagementService
