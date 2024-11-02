import http from '@frontend/lib/http'
import { EnrollmentGeneral } from '../interfaces/EnrollmentGeneral'
import { EnrollmentModification } from '../interfaces/EnrollmentModification'
import axios from 'axios'
import { Filters } from '@frontend/interfaces/types'

class EnrollmentService {
  public static async createEnrollmentModification(
    enrollment: Omit<EnrollmentModification, 'state'>
  ): Promise<void> {
    try {
      // Realizamos la petición POST al endpoint /enrollment
      const res = await http.post('/enrollment/modifications', enrollment)
      const response = res.data as ResponseAPI

      // Verificamos si la respuesta indica éxito
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      // Manejo de errores de Axios
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error // Re-lanzamos el error si no es de Axios
    }
  }

  public static async getAllEnrollments(
    filtersAndPagination: Filters
  ): Promise<PaginatedData<EnrollmentGeneral>> {
    try {
      const res = await http.get('/enrollment/modifications/paginated', {
        params: {
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'requestNumber.asc',
        },
      })
      const response = res.data as ResponseAPI<PaginatedData<EnrollmentGeneral>>
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getEnrollment({
    requestId,
  }: {
    requestId: EnrollmentGeneral['requestNumber']
  }): Promise<EnrollmentGeneral> {
    try {
      const res = await http.get(`/enrollment/modifications/${requestId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as EnrollmentGeneral
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get enrollment request data')
    }
  }

  public static async updateEnrollment({
    requestNumber,
    state,
  }: Pick<EnrollmentGeneral, 'state' | 'requestNumber'>) {
    try {
      const res = await http.put(`/enrollment/modifications/${requestNumber}`, {
        state,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as EnrollmentGeneral
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update enrollment request data')
    }
  }
}

export default EnrollmentService
