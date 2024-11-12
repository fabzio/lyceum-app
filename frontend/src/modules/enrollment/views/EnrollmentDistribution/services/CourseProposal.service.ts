import { CourseProposition } from '../../../interfaces/CourseProposition'
import http from '@frontend/lib/http'
import axios from 'axios'

class CourseProposalService {
  static async fetchCourseProposals(filters: {
    requestNumber: number
    pageSize?: number
    pageIndex?: number
    limit?: number
    q?: string
    sortBy?: string
  }) {
    try {
      const res = await http.get(
        `enrollment/schedule-proposal/${filters.requestNumber}/courses`,
        {
          params: {
            q: filters.q || '',
            page: filters.pageIndex || 0,
            limit: filters.pageSize || 5,
            sortyBy: filters.sortBy || 'name.asc',
          },
        }
      )
      const response = res.data as ResponseAPI<PaginatedData<CourseProposition>>
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
export default CourseProposalService
