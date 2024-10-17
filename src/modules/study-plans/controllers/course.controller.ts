import { Hono } from 'hono'
import { CourseDAO } from '../dao/CourseDAO'
import CourseService from '../services/course.service'
import { zValidator } from '@hono/zod-validator'
import { createCoursesDTO } from '../dto/CourseManagementDTO'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class CourseController {
  private router = new Hono()
  private courseService: CourseDAO = new CourseService()

  public getCourses = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.courseService.getAllCourses(),
      message: 'Courses retrieved',
      success: true,
    }
    return c.json(response)
  })

  public getCoursesDetail = this.router.get('/:courseId', async (c) => {
    const { courseId } = c.req.param()

    const response: ResponseAPI = {
      data: await this.courseService.getCoursesDetail({
        courseId: courseId,
      }),
      message: 'Courses retrieved',
      success: true,
    }
    return c.json(response)
  })

  public createCourse = this.router.post(
    '/',
    zValidator('json', createCoursesDTO),
    async (c) => {
      const { courseList } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.courseService.createCourse(courseList),
          message: 'Courses created',
          success: true,
        }
        return c.json(response)
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )
}
export default CourseController
