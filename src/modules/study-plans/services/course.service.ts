import { Course } from '@/interfaces/models/Course'
import http from '@/lib/http'
import axios from 'axios'

class CourseService {
  static async fetchCourses(): Promise<Course[]> {
    try {
      const res = await http.get('/study-plan/courses')

      const response = res.data as ResponseAPI<Course[]>
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

  static async addCourse(course: Course): Promise<Course> {
    return new Promise((resolve) => setTimeout(() => resolve(course), 500))
  }

  static async updateCourse(course: Course): Promise<Course> {
    return new Promise((resolve) => setTimeout(() => resolve(course), 500))
  }
}

export default CourseService
