import http from '@frontend/lib/http'
import axios from 'axios'

class EnrollmenDistributionService {
  public static async createSchedulesFormProposal(requestId: number) {
    try {
      const res = await http.post(
        `/enrollment/schedule-distribution/${requestId}`
      )
      const reponse = res.data as ResponseAPI
      if (!reponse.success) {
        throw new Error(reponse.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message)
      }
      throw error
    }
  }
}

export default EnrollmenDistributionService
