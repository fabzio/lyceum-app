import http from '@frontend/lib/http'
import { ThesisThemeRequest } from '../interfaces/ThesisThemeRequest'
import { ThesisThemeDetail } from '../interfaces/ThesisThemeDetail'
import { ThesisThemeRequestAction } from '../interfaces/ThesisThemeRequestAction'
import { notFound } from '@tanstack/react-router'
import axios from 'axios'
import { Thesis } from '../interfaces/Thesis'
import { Account } from '@frontend/interfaces/models/Account'

class ThesisThemeRequestService {
  public static async getThesisThemeDocuments(docId: string) {
    try {
      const res = await http.get(`/thesis/theme/document/${docId}`, {
        responseType: 'blob',
      })
      return {
        file: res.data,
        type: res.headers['content-type'],
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async createThesis(thesis: Omit<Thesis, 'id'>): Promise<{
    thesisCode: string
    historyId: number
  }> {
    try {
      const formData = new FormData()
      formData.append('title', thesis.title)
      formData.append('areaId', thesis.areaId.toString())
      formData.append('applicantCode', thesis.applicantCode)
      formData.append('advisors', JSON.stringify(thesis.advisors))
      formData.append('students', JSON.stringify(thesis.students))
      formData.append('justification', thesis.justification)

      const res = await http.post(`/thesis/theme`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

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
  public static async getStudentThesisThemeRequest({
    studentCode,
  }: {
    studentCode: Account['code']
  }) {
    try {
      const res = await http.get(`/thesis/theme/student/${studentCode}`)
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

  public static async getAdvisorThesisThemeRequest({
    advisorCode,
  }: {
    advisorCode: Account['code']
  }) {
    try {
      const res = await http.get(`/thesis/theme/advisor/${advisorCode}`)
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

  public static async getAreaThesisThemeRequest({
    areaId,
  }: {
    areaId: number
  }) {
    try {
      const res = await http.get(`/thesis/theme/area/${areaId}`)
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

  public static async getSpecialtyThesisThemeRequest({
    specialtiyId,
  }: {
    specialtiyId: number
  }) {
    try {
      const res = await http.get(`/thesis/theme/speciality/${specialtiyId}`)
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
    content: string | File
    isFile: boolean
    action: 'sended' | 'approved' | 'denied'
    accountId: string
    roleId: number
  }) {
    const formData = new FormData()
    formData.append('content', content)
    formData.append('isFile', isFile.toString())
    formData.append('action', action)
    formData.append('accountId', accountId)
    formData.append('roleId', roleId.toString())

    try {
      const res = await http.post(`/thesis/theme/${code}/history`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
