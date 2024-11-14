import { Account } from '@frontend/interfaces/models/Account'
import http from '@frontend/lib/http'
import axios from 'axios'
import { SurveyStudent } from '../interfaces/SurveyStudent'
import { SurveyQuestions } from '../interfaces/SuerveyQuestions'
import { SurveyFormValues } from '../views/AnwserSurvey/AnwserSurveyDetail/components/SurveyForm'

class AnwserSurveyService {
  public static async getUnawseredSurveys(params: {
    accountId: Account['id']
  }) {
    try {
      const res = await http.get('/surveys/survey', { params })
      const response = res.data as ResponseAPI<SurveyStudent[]>
      if (!response.success) throw new Error(response.message)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getQuestions(params: { surveyId: number }) {
    try {
      const res = await http.get(`/surveys/survey/${params.surveyId}/questions`)
      const response = res.data as ResponseAPI<SurveyQuestions>
      if (!response.success) throw new Error(response.message)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async insertAnswers(
    params: SurveyFormValues & {
      evaluatorAccountId: Account['id']
      subjectAccountId: Account['id']
      scheduleId: number
    }
  ) {
    try {
      const res = await http.post('/surveys/survey/answers', params)
      const response = res.data as ResponseAPI
      if (!response.success) throw new Error(response.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default AnwserSurveyService
