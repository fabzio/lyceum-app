import http from '@frontend/lib/http'
import axios from 'axios'
class ScheduleProposalService {
  public static async updateScheduleProposalStatus(
    scheduleId: string,
    newStatus: string
  ): Promise<void> {
    try {
      const res = await http.post(
        `enrollment/schedule-proposal/${scheduleId}`,
        {
          newStatus: newStatus,
        }
      )
      const response = res.data as ResponseAPI<null>
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseAPI
        if (errorResponse) {
          throw new Error(errorResponse.message)
        }
      }
      throw error
    }
  }
}

export default ScheduleProposalService
