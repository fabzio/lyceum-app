import http from '@/lib/http'
import { ThesisThemeDetail } from '../interfaces/ThesisThemeDetail'
import { Account } from '@/interfaces/Account'
import ThesisJuryRequest from '../interfaces/ThesisJuryRequest'

class ThesisJuryRequestService {
  public static async getStudentThesis(
    studentCode: string
  ): Promise<ThesisThemeDetail> {
    try {
      const res = await http.get(`/thesis/jury/search/${studentCode}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as ThesisThemeDetail
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  public static async getThesisJuries(thesisCode: string): Promise<Account[]> {
    try {
      const res = await http.get(`/thesis/jury/${thesisCode}/juries`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as Account[]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public static async createThesisJuryRequest(
    thesisCode: string
  ): Promise<void> {
    try {
      const res = await http.post(`thesis/jury/${thesisCode}`)
      if (!res.data.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  public static async getThesisJuryRequests() {
    try {
      const res = await http.get('/thesis/jury')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as ThesisJuryRequest[]
    } catch (error) {
      throw new Error((error as Error).message)
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
        throw new Error('Error')
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}

export default ThesisJuryRequestService
