import http from '@frontend/lib/http'
import { ThesisThemeDetail } from '../interfaces/ThesisThemeDetail'
import { Account } from '@frontend/interfaces/models/Account'
import ThesisJuryRequest from '../interfaces/ThesisJuryRequest'
import axios from 'axios'

class ThesisJuryRequestService {
  public static async getStudentThesis(
    studentCode: string
  ): Promise<ThesisThemeDetail> {
    try {
      const res = await http.get(`/thesis/jury/search/${studentCode}`)
      const response = res.data as ResponseAPI<ThesisThemeDetail>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
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
  public static async getThesisJuries(thesisCode: string): Promise<Account[]> {
    try {
      const res = await http.get(`/thesis/jury/${thesisCode}/juries`)
      const response = res.data as ResponseAPI<Account[]>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
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

  public static async createThesisJuryRequest(
    thesisCode: string
  ): Promise<void> {
    try {
      const res = await http.post(`thesis/jury/${thesisCode}`)
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

  public static async getThesisJuryRequests(
    unitID: number,
    filter?: 'unassigned' | 'requested' | 'assigned'
  ): Promise<ThesisJuryRequest[]> {
    try {
      console.log(unitID)
      const res = await http.get(`/thesis/jury`, {
        params: { unitID, filter },
      })
      const response = res.data as ResponseAPI<ThesisJuryRequest[]>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
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

  public static async insertThesisJuries({
    thesisCode,
    codeList,
  }: {
    thesisCode: string
    codeList: string[]
  }) {
    try {
      const res = await http.post(`/thesis/jury/${thesisCode}/juries`, {
        codeList,
      })
      const response = res.data as ResponseAPI
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

export default ThesisJuryRequestService
