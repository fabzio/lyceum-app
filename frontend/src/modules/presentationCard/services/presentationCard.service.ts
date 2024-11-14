import axios from 'axios'
import { Account } from '@frontend/interfaces/models/Account'
import { PresentationCardRequest } from '../interfaces/PresentationCardRequest'
//import http from '@frontend/lib/http'
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
              presentationCard: {
                id: '12345',
                entityName: 'Entity Name',
                scheduleId: 67891,
                description: 'Description of the presentation card',
                createdAt: '2023-10-01T00:00:00Z',
                accountIds: [accountCode, 'ACC456'],
                file: new File([''], 'filename.txt'),
              },
              status: 'pending',
              step: 1,
              lastAction: {
                id: 6,
                account: 'la tuya',
                action: 'enviado',
                role: 'Estudiante',
              },
            },
            {
              presentationCard: {
                id: '123456',
                entityName: 'Entity Name2',
                scheduleId: 67891,
                description: 'Description of the presentation card2',
                createdAt: '2023-10-01T00:00:00Z',
                accountIds: [accountCode, 'ACC4562'],
                file: new File([''], 'filename2.txt'),
              },
              status: 'approved',
              step: 3,
              lastAction: {
                id: 66,
                account: 'la mia',
                action: 'aprobado',
                role: 'Director',
              },
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
      return response.data as PresentationCardRequest[]
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
  public static async insertPresentationCard(
    presentationCard: Omit<PresentationCard, 'createdAt' | 'id'>
  ): Promise<PresentationCardRequest> {
    try {
      const formData = new FormData()
      formData.append('entityName', presentationCard.entityName)
      formData.append('scheduleId', presentationCard.scheduleId.toString())
      formData.append('accountIds', JSON.stringify(presentationCard.accountIds))
      formData.append('description', presentationCard.description)

      // const res = await http.post(`/thesis/theme`, formData)
      // LETTER: Cambiar mock data por lo que devuelva el endpoint
      const res = {
        data: {
          data: {
            presentationCard: {
              id: '12345',
              entityName: 'OpenAI Project',
              scheduleId: '789',
              accountIds: ['AC001', 'AC002', 'AC003'],
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
              file: {
                name: 'OpenAI_Collaboration_Proposal.pdf',
                size: 1048576,
                type: 'application/pdf',
                lastModified: 1699316600000,
              },
            },
            status: 'pending',
            step: 2,
            lastAction: {
              id: 42,
              account: 'AC001',
              action: 'sended',
              role: 'Manager',
            },
          },
          success: true,
        },
      }

      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as PresentationCardRequest
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}
export default PresentationCardService
