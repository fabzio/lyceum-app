import http from '@/lib/http'
import { ThesisThemeRequest } from '../interfaces/ThesisThemeRequest'
import { ThesisThemeDetail } from '../interfaces/ThesisThemeDetail'
import { ThesisThemeRequestAction } from '../interfaces/ThesisThemeRequestAction'
import { notFound } from '@tanstack/react-router'
import axios from 'axios'
import { Thesis } from '../interfaces/Thesis'

class ThesisThemeRequestService {
  public static async createThesis(thesis: Omit<Thesis, 'id'>): Promise<{
    thesisCode: string
    historyId: number
  }> {
    try {
      const res = await http.post(`/thesis/theme`, thesis)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as {
        thesisCode: string
        historyId: number
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
  public static async getThesisThemeRequest() {
    try {
      const res = await http.get('/thesis/theme')
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as ThesisThemeRequest[]
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

  public static async getThemeRequestDetail(code: string) {
    try {
      const res = await http.get(`/thesis/theme/${code}`)
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data as ThesisThemeDetail
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 404) throw notFound()
        const errorResponse = error.response?.data as ResponseAPI

        if (errorResponse) {
          throw new Error(errorResponse.message)
        }
      }
      throw error
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
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseAPI
        if (errorResponse) {
          throw new Error(errorResponse.message)
        }
      }
      throw error
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
    action: 'sended' | 'approved' | 'denied'
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
export default ThesisThemeRequestService
