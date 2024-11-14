import { Account } from '@frontend/interfaces/models/Account'
import http from '@frontend/lib/http'
import axios from 'axios'

class AnwserSurvey {
  public async getUnawseredSurveys(params: { accountId: Account['id'] }) {
    try {
      const res = await http.get('/surverys/survey', { params })
      const response = res.data as ResponseAPI
      if (!response.success) throw new Error(response.message)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default AnwserSurvey
