import { Course } from '@/interfaces/models/Course'
import { PaginatedData } from '@/interfaces/PaginatedData'
export interface CourseDAO {
  getAllCourses: (filters: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }) => Promise<PaginatedData<Course>>
  getCoursesDetail: (params: { courseId: string }) => Promise<Course>
  createCourse: (
    courseList: { name: string; code: string; credits: number }[]
  ) => Promise<void>
  updateCourse: (
    courseCode: string,
    course: {
      name: string
      code: string
      credits: number
    }
  ) => Promise<void>
  disableCourse: (courseCode: string) => Promise<void>
}
