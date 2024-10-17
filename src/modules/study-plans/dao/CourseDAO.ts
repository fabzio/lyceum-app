import { Course } from '@/interfaces/models/Course'
export interface CourseDAO {
  getAllCourses: () => Promise<Course[]>
  getCoursesDetail: (params: { courseId: string }) => Promise<Course>
  createCourse: (
    courseList: { name: string; code: string; credits: number }[]
  ) => Promise<void>
}
