import http from '@frontend/lib/http'
import axios from 'axios'
import { EnrollmentProposal } from '../interfaces/EnrollmentProposal'

class EnrollmentProposalService {
  public static async getAllEnrollmentProposalsRequest(filters: {
    unitId: number
    pageIndex?: number
    limit?: number
    q?: string
    termId?: number
  }) {
    try {
      const res = await http.get('/enrollment/schedule-proposal', {
        params: {
          ...filters,
          page: filters.pageIndex || 0,
          limit: filters.limit || 5,
        },
      })
      const response = res.data as ResponseAPI<
        PaginatedData<EnrollmentProposal>
      >
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message)
      }
      throw error
    }
  }

  public static async updateScheduleProposalStatus(
    scheduleId: string,
    newStatus: string
  ): Promise<void> {
    try {
      const res = await http.put(`enrollment/schedule-proposal/${scheduleId}`, {
        newStatus: newStatus,
      })
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

  public static async newEnrollmentProposal({
    facultyId,
    accountId,
    termId,
  }: {
    facultyId: number
    accountId: string
    termId: number
  }): Promise<void> {
    try {
      const res = await http.post(`/enrollment/schedule-proposal`, {
        facultyId,
        accountId,
        termId,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          (error.response?.data.message || error.message) ?? error.message
        )
      }
      throw error
    }
  }
}

export default EnrollmentProposalService
