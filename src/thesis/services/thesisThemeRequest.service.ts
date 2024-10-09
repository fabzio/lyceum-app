import http from '@/lib/http'
import { ThesisThemeRequest } from '../interfaces/ThesisThemeRequest'

class ThesisThemeRequestService {
  public static async getThesisThemeRequests(): Promise<ThesisThemeRequest[]> {
    try {
      const res = await http.get('/thesis-theme-requests')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as ThesisThemeRequest[]
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public static async createThesisThemeRequest(thesisThemeRequest: Omit<ThesisThemeRequest, 'id'>): Promise<void> {
    try {
      const res = await http.post(`/thesis-theme-requests`, {
        ...thesisThemeRequest,
        thesis: thesisThemeRequest.thesis,
        requester: thesisThemeRequest.requester,
        status: thesisThemeRequest.status,
        submissionDate: thesisThemeRequest.submissionDate,
        aprovalDate: thesisThemeRequest.aprovalDate,
        approvalHistory: thesisThemeRequest.approvalHistory,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  public static async updateThesisThemeRequest(thesisThemeRequest: ThesisThemeRequest): Promise<void> {
    try {
      const res = await http.put(`/thesis-theme-requests`, {
        id: thesisThemeRequest.id,
        thesis: thesisThemeRequest.thesis,
        requester: thesisThemeRequest.requester,
        status: thesisThemeRequest.status,
        submissionDate: thesisThemeRequest.submissionDate,
        aprovalDate: thesisThemeRequest.aprovalDate,
        approvalHistory: thesisThemeRequest.approvalHistory,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  public static async deleteThesisThemeRequest(thesisThemeRequestId: ThesisThemeRequest['id']): Promise<void> {
    try {
      const res = await http.delete(`/thesis-theme-requests/${thesisThemeRequestId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default ThesisThemeRequestService
