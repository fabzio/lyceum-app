import { Filters } from '@frontend/interfaces/types'
import http from '@frontend/lib/http'
import axios from 'axios'
import { Delegate } from '../interfaces/Delegate'

class DelegatesService {
  static async fetchDelegates(
    filtersAndPagination: Filters,
    specialityId: string,
    idTerm: string
  ): Promise<PaginatedData<Delegate>> {
    try {
      console.log(specialityId, idTerm)
      const res = await http.get('/courses/lead-students', {
        params: {
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'studentFullName.asc',
          specialityId: specialityId,
          idTerm: idTerm,
        },
      })

      const response = res.data as ResponseAPI<PaginatedData<Delegate>>
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
export default DelegatesService
