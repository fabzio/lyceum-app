import axios from 'axios'
import { Account } from '@frontend/interfaces/models/Account'
import http from '@frontend/lib/http'
import { NewPresentationCardFormValues } from '../views/CoverLetter/PresentationCardDetail/components/PresentationCardForm'
import {
  PresentationCard,
  PresentationCardDetail,
} from '../interfaces/PresentationCard'
import { Unit } from '@frontend/interfaces/models/Unit'

class PresentationCardService {
  public static async getPresentationCardRequestsInUnit(params: {
    unitId: Unit['id']
  }) {
    try {
      const res = await http.get(`/presentation-letters/letters`, { params })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as PresentationCard[]
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
  public static async getPresentationCardRequests({
    accountCode,
  }: {
    accountCode: Account['code']
  }) {
    try {
      const res = await http.get(`/thesis/theme/student/${accountCode}`)

      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }
      console.log('aca muere ')
      return response.data as PresentationCard[]
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

  public static async getPresentationCardDetail(id: number) {
    try {
      const res = await http.get(`/presentation-letters/letters/${id}`)
      const response = res.data as ResponseAPI<PresentationCardDetail>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async insertPresentationCard({
    accountId,
    presentationCard,
  }: {
    accountId: string
    presentationCard: NewPresentationCardFormValues
  }): Promise<{
    id: string
    companyName: string
  }> {
    try {
      const formData = new FormData()
      formData.append('companyName', presentationCard.companyName)
      formData.append('scheduleId', presentationCard.scheduleId.toString())
      formData.append('accounts', JSON.stringify(presentationCard.accountIds))
      formData.append('description', presentationCard.description)
      formData.append('documentFile', presentationCard.documentFile)
      const res = await http.post(
        `/presentation-letters/letters/${accountId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      const response = res.data as ResponseAPI<{
        id: string
        companyName: string
      }>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}
export default PresentationCardService
