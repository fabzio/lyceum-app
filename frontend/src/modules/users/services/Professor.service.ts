// import { Course } from '@frontend/interfaces/models/Course'
import { Filters } from '@frontend/interfaces/types'
import http from '@frontend/lib/http'
import { Professor } from '../interfaces/Professor'
import axios from 'axios'

class ProfessorService {
  static async fetchProfessors(
    filtersAndPagination: Filters
  ): Promise<PaginatedData<Professor>> {
    try {
      const res = await http.get('/accounts/professors', {
        params: {
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'name.asc',
        },
      })

      const response = res.data as ResponseAPI<PaginatedData<Professor>>
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

  static async addProfessor(
    professors: Pick<
      Professor,
      'code' | 'name' | 'firstSurname' | 'secondSurname' | 'email'
    >[]
  ): Promise<void> {
    try {
      const res = await http.post('/accounts/professors', {
        professorList: professors,
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
  static async getProfessorDetail(code: string): Promise<Professor> {
    try {
      const res = await http.get(`/accounts/professors/${code}`)
      const response = res.data as ResponseAPI<Professor>
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

export default ProfessorService
