import http from '@/lib/http'
import { ThesisJuryRequest } from '../interfaces/ThesisJuryRequest'

class ThesisJuryRequestService {
  public static async getThesisJuryRequests(): Promise<ThesisJuryRequest[]> {
    try {
      const res = await http.get('/thesis-jury-requests')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as ThesisJuryRequest[]
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public static async createThesisJuryRequest(thesisJuryRequest: Omit<ThesisJuryRequest, 'id'>): Promise<void> {
    try {
      const res = await http.post(`/thesis-jury-requests`, {
        ...thesisJuryRequest,
        thesis: thesisJuryRequest.thesis,
        jury: thesisJuryRequest.jury,
        status: thesisJuryRequest.status,
        approvalHistory: thesisJuryRequest.approvalHistory,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  public static async updateThesisJuryRequest(thesisJuryRequest: ThesisJuryRequest): Promise<void> {
    try {
      const res = await http.put(`/thesis-jury-requests`, {
        id: thesisJuryRequest.id,
        thesis: thesisJuryRequest.thesis,
        jury: thesisJuryRequest.jury,
        status: thesisJuryRequest.status,
        approvalHistory: thesisJuryRequest.approvalHistory,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  public static async deleteThesisJuryRequest(thesisJuryRequestId: ThesisJuryRequest['id']): Promise<void> {
    try {
      const res = await http.delete(`/thesis-jury-requests/${thesisJuryRequestId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default ThesisJuryRequestService
