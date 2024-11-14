import { Hiring } from '@frontend/interfaces/models/Hiring'
import http from '@frontend/lib/http'
import axios from 'axios'
import { CreateTeacherSelectionForm } from '../views/TeacherSelection/NewTeacherSelection/components/TeacherSelectionForm'
import { Filters } from '@frontend/interfaces/types'

class HiringService {
  public static async createTeacherSelection(
    data: CreateTeacherSelectionForm & {
      unitId: number
    }
  ) {
    try {
      const res = await http.post('/hiring/selection', data)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
  public static async getHirings(
    filters: Filters & { unitId: number }
  ): Promise<Hiring[]> {
    try {
      const res = await http.get('/hiring/selection', {
        params: filters,
      })
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Hiring[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default HiringService
