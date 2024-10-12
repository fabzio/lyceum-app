import { Course } from '@/interfaces/models/Course'
export interface CourseDAO {
  getAllCourses: () => Promise<Course[]>
  getCoursesDetail: (params: { courseId: string }) => Promise<Course>
}
