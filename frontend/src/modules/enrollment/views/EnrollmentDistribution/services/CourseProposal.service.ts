import { CourseProposition } from '../../../interfaces/CourseProposition'
import http from '@frontend/lib/http'
import axios from 'axios'

class CourseProposalService {
  static async fetchCourseProposals(filters: {
    pageSize?: number
    pageIndex?: number
    limit?: number
    q?: string
    sortBy?: string
  }) {
    try {
      const res = await http.get(`enrollment/schedule-proposal/1`, {
        params: {
          q: filters.q || '',
          page: filters.pageIndex || 0,
          limit: filters.pageSize || 5,
          sortyBy: filters.sortBy || 'name.asc',
        },
      })
      const response = res.data as ResponseAPI<PaginatedData<CourseProposition>>
      if (!response.success) {
        throw new Error(response.message)
      }

      //TODO: Poner el endpoint correcto de la distribucion de cursos de la
      // especialidad en cuestion y quitar el mockup
      //   const res = await http.get('/enrollment/', {
      //     params: {
      //       q: filtersAndPagination.q || '',
      //       page: filtersAndPagination.pageIndex || 0,
      //       limit: filtersAndPagination.pageSize || 5,
      //       sortBy: filtersAndPagination.sortBy || 'name.asc',
      //     },
      //   })
      // TODO: Borrar estas dos lineas de abajo porque son solo para que no tire error

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}
export default CourseProposalService
