import { Unit } from '@frontend/interfaces/models/Unit'
import http from '@frontend/lib/http'
import axios from 'axios'

class UnitService {
  public static async getUnitsByType(type: string) {
    try {
      const res = await http.get('/unit/units', {
        params: {
          type,
        },
      })
      const response = res.data as ResponseAPI<Unit[]>
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
export default UnitService
