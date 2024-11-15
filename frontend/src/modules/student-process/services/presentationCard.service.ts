import axios from 'axios'
import { Account } from '@frontend/interfaces/models/Account'
import http from '@frontend/lib/http'
import { NewPresentationCardFormValues } from '../views/CoverLetter/PresentationCardDetail/components/PresentationCardForm'
import { PresentationCard } from '../interfaces/PresentationCard'

class PresentationCardService {
  public static async getPresentationCardRequests({
    accountCode,
  }: {
    accountCode: Account['code']
  }) {
    try {
      // LETTER: Integrar con el endpoint del backend
      //   const res = await http.get(`/thesis/theme/student/${studentCode}`)
      const res = {
        data: {
          data: [
            {
              id: '12345',
              companyName: 'OpenAI Project',
              scheduleId: '789',
              description: 'Project proposal for OpenAI collaboration',
              createdAt: '2024-11-12T10:30:00Z',
              scheduleCode: 'SCH-2024-001',
              courseCode: 'CS101',
              courseName: 'Introduction to Machine Learning',
              accounts: [
                { code: 'AC001', name: 'John Doe', role: 'Manager' },
                { code: 'AC002', name: 'Jane Smith', role: 'Analyst' },
                { code: 'AC003', name: 'Alice Brown', role: 'Developer' },
              ],
            },
            {
              id: '123456',
              companyName: 'CLARO PERU',
              scheduleId: 67891,
              description: 'CLARO es una empresa de telecomunicaciones en Perú',
              createdAt: '2023-10-01T00:00:00Z',
              accountIds: [accountCode, 'ACC456'],
              file: new File([''], 'filename.txt'),
            },
            {
              id: '1234567',
              companyName: 'INTERBANK PERU',
              scheduleId: 67891,
              description:
                'INTERBANK es una empresa de servicios financieros en Perú',
              createdAt: '2023-10-01T00:00:00Z',
              accountIds: [accountCode, 'ACC4562'],
              file: new File([''], 'filename2.txt'),
            },
          ],
          success: true,
        },
      }
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
      formData.append('accountIds', JSON.stringify(presentationCard.accountIds))
      formData.append('description', presentationCard.description)
      formData.append('documentFile', presentationCard.documentFile)
      const res = await http.post(
        `/presentation-letters/letters${accountId}`,
        formData
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
