import { UnitType } from '@frontend/interfaces/enums'
import { Term } from '@frontend/interfaces/models'
import { Account } from '@frontend/interfaces/models/Account'
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

  public static async getChildUnits(unitId: Unit['id']) {
    try {
      const res = await http.get(`/unit/units/${unitId}/children`)
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

  public static async updateUnit(unit: Unit) {
    try {
      const res = await http.put(`/unit/units/${unit.id}`, {
        name: unit.name,
        description: unit.description,
        parentId: unit.parentId,
        unitType: unit.unitType,
      })
      const response = res.data as ResponseAPI<Unit>
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

  public static async fetchTerms(params: Filters) {
    try {
      const res = await http.get('/unit/units/terms/paginated', {
        params: {
          q: params.q || '',
          page: params.pageIndex || 0,
          limit: params.pageSize || 10,
        },
      })
      const response = res.data as ResponseAPI<PaginatedData<Term>>
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
  static async makeCurrentTerm(id: number): Promise<void> {
    try {
      const response = await http.put('/unit/units/terms/makeCurrent', null, {
        params: { id }, // Pasamos el ID del término
      })

      if (!response.data.success) {
        throw new Error('Error al actualizar el término actual')
      }
    } catch (error) {
      throw new Error('No se pudo actualizar el término actual')
    }
  }

  public static async getStudentsFromUnit({
    unitId,
    q,
  }: {
    unitId: number
    q: string
  }): Promise<Account[]> {
    try {
      const res = await http.get(`/unit/units/students/${unitId}`, {
        params: { q },
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Account[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message)
      }
      throw error
    }
  }
}
export default UnitService
