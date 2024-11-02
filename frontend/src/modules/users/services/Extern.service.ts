// import { Course } from '@frontend/interfaces/models/Course'
import { Filters } from '@frontend/interfaces/types'
import http from '@frontend/lib/http'
import { Extern } from '../interfaces/Extern'
import axios from 'axios'

class ExternService {
  static async fetchExterns(
    filtersAndPagination: Filters
  ): Promise<PaginatedData<Extern>> {
    try {
      const res = await http.get('/accounts/externals', {
        params: {
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'name.asc',
        },
      })

      const response = res.data as ResponseAPI<PaginatedData<Extern>>
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

  static async addExternal(
    externals: Pick<
      Extern,
      'code' | 'name' | 'firstSurname' | 'secondSurname' | 'email'
    >[]
  ): Promise<void> {
    try {
      const res = await http.post('/accounts/externals', {
        externalList: externals,
      })
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

  // static async updateCourse(args: {
  //   code: string
  //   course: Pick<Course, 'code' | 'credits' | 'name'>
  // }): Promise<void> {
  //   try {
  //     const res = await http.put(
  //       `/study-plan/course-management/${args.code}`,
  //       args.course
  //     )
  //     const response = res.data as ResponseAPI
  //     if (!response.success) {
  //       throw new Error(response.message)
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       throw new Error(error.response?.data.message || error.message)
  //     }
  //     throw error
  //   }
  // }

  // static async deleteCourse(code: string): Promise<void> {
  //   try {
  //     const res = await http.delete(`/study-plan/course-management/${code}`)
  //     const response = res.data as ResponseAPI
  //     if (!response.success) {
  //       throw new Error(response.message)
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       throw new Error(error.response?.data.message || error.message)
  //     }
  //     throw error
  //   }
  // }
}

export default ExternService
