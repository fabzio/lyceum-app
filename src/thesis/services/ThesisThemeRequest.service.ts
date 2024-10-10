import http from '@/lib/http'
import { ThesisThemeRequest } from '../interfaces/ThesisThemeRequest'
import { ThesisThemeDetail } from '../interfaces/ThesisThemeDetail'
import { ThesisThemeRequestAction } from '../interfaces/ThesisThemeRequestAction'

class ThesisThemeRequestService {
  public static async getThesisThemeRequest() {
    try {
      const res = await http.get('/thesis/theme')
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

  public static async getThemeRequestDetail(code: string) {
    try {
      const res = await http.get(`/thesis/theme/${code}`)
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error('Error')
      }

      return response.data as ThesisThemeDetail
    } catch (error) {
      console.error(error)
    }
  }

  public static async getThemeRequestHistory(code: string) {
    try {
      const res = await http.get(`/thesis/theme/${code}/history`)
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error('Error')
      }

      return response.data as ThesisThemeRequestAction[]
    } catch (error) {
      console.error(error)
    }
  }
  public static async insertThesisThemeReview({
    code,
    content,
    isFile,
    action,
    accountId,
    roleId,
  }: {
    code: string
    content: string | Blob
    isFile: boolean
    action: string
    accountId: string
    roleId: number
  }) {
    try {
      const res = await http.post(`/thesis/theme/${code}/history`, {
        content,
        isFile,
        action,
        accountId,
        roleId,
      })
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
