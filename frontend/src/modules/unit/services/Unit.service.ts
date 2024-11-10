import { UnitType } from '@frontend/interfaces/enums'
import { Unit } from '@frontend/interfaces/models/Unit'
import { Filters } from '@frontend/interfaces/types'
import http from '@frontend/lib/http'
import axios from 'axios'

class UnitService {
  public static async getUnitByTypePaginated(
    params: Filters & { unitType: UnitType }
  ) {
    try {
      const res = await http.get('/unit/units/paginated', {
        params: {
          q: params.q || '',
          page: params.pageIndex || 0,
          limit: params.pageSize || 10,
          unitType: params.unitType,
        },
      })
      const response = res.data as ResponseAPI<PaginatedData<Unit>>
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
  public static async getUnitsByType({
    type,
    q,
  }: {
    q?: string
    type: string
  }) {
    try {
      const res = await http.get('/unit/units', {
        params: {
          type,
          q,
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

  public static async createUnits(units: Omit<Unit, 'id'>[]) {
    try {
      const res = await http.post(
        '/unit/units',
        units.map((unit) => ({ ...unit, type: unit.unitType }))
      )
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
