// import { Course } from '@/interfaces/models/Course'
import { Filters } from '@/interfaces/types'
import http from '@/lib/http'
import { Student } from '../interfaces/Student'
import axios from 'axios'

class StudentService {
  static async fetchStudents(
    filtersAndPagination: Filters
  )
  : Promise<PaginatedData<Student>> 
  {
    try {
      
      const res = await http.get('/accounts/students', {
        params: {
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'name.asc',
        },
      })

      const response = res.data as ResponseAPI<PaginatedData<Student>>
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
  // TODO: Implementar los metodos que faltan
  // static async addCourse(
  //   courses: Pick<Course, 'code' | 'credits' | 'name'>[]
  // ): Promise<void> {
  //   try {
  //     const res = await http.post('/study-plan/course-management', {
  //       courseList: courses,
  //     })
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

export default StudentService
