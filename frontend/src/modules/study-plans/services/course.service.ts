import { Course } from '@frontend/interfaces/models/Course'
import { Filters } from '@frontend/interfaces/types'
import http from '@frontend/lib/http'
import axios from 'axios'

class CourseService {
  static async fetchCourses(
    filtersAndPagination: Filters
  ): Promise<PaginatedData<Course>> {
    try {
      const res = await http.get('/study-plan/course-management', {
        params: {
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'name.asc',
        },
      })

      const response = res.data as ResponseAPI<PaginatedData<Course>>
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
  //por el momento funciona con fetch pero si no se desea paginacion se deberia implementar lo siguiente:
  /*
  static async getCourse(name: string): Promise<Course> {
    try {
      const res = await http.get('/study-plan/course-management', {
        params: { q: name },
      })
      const response = res.data as ResponseAPI<Course>
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
  */
  static async addCourse(
    courses: Pick<Course, 'code' | 'credits' | 'name'>[]
  ): Promise<void> {
    try {
      const res = await http.post('/study-plan/course-management', {
        courseList: courses,
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

  static async updateCourse(args: {
    code: string
    course: Pick<Course, 'code' | 'credits' | 'name'>
  }): Promise<void> {
    try {
      const res = await http.put(
        `/study-plan/course-management/${args.code}`,
        args.course
      )
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

  static async deleteCourse(code: string): Promise<void> {
    try {
      const res = await http.delete(`/study-plan/course-management/${code}`)
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
}

export default CourseService
