import { Course } from '@/interfaces/models/Course'
import http from '@/lib/http'
import axios from 'axios'
import { CourseFilters } from '../interfaces/CourseFilters'

class CourseService {
  static async fetchCourses(
    filtersAndPagination: CourseFilters
  ): Promise<PaginatedData<Course>> {
    console.log('filtersAndPagination', filtersAndPagination)
    try {
      const res = await http.get('/study-plan/course-management', {
        params: {
          q: `${filtersAndPagination?.name || ''}${filtersAndPagination?.code||''}`,
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 10,
          sortBy: filtersAndPagination.sortBy || 'name.asc',
        },
      })

      const response = res.data as ResponseAPI<Course[]>
      if (!response.success) {
        throw new Error(response.message)
      }
      return {
        result: response.data,
        rowCount: response.data.length,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

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

  static async updateCourse(course: Course): Promise<Course> {
    return new Promise((resolve) => setTimeout(() => resolve(course), 500))
  }
}

export default CourseService
