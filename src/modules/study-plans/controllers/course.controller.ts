import { Hono } from 'hono'
import { CourseDAO } from '../dao/CourseDAO'
import CourseService from '../services/course.service'
import { zValidator } from '@hono/zod-validator'
import { createCoursesDTO } from '../dto/CourseManagementDTO'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { z } from 'zod'

class CourseController {
  private router = new Hono()
  private courseService: CourseDAO = new CourseService()

  public getCourses = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.string().transform((v) => parseInt(v)),
        limit: z.string().transform((v) => parseInt(v)),
        sortBy: z.string().optional(),
      })
    ),
    async (c) => {
      const filters = c.req.valid('query')
      const response: ResponseAPI = {
        data: await this.courseService.getAllCourses(filters),
        message: 'Courses retrieved',
        success: true,
      }
      return c.json(response)
    }
  )
  public searchCourses = this.router.get(
    '/search',
    zValidator('query', z.object({ q: z.string() })),
    async (c) => {
      const { q } = c.req.valid('query')
      const response: ResponseAPI = {
        data: await this.courseService.searchCourses(q),
        message: 'Courses retrieved',
        success: true,
      }
      return c.json(response)
    }
  )

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

  public updateCourse = this.router.put(
    '/:courseCode',
    zValidator('param', z.object({ courseCode: z.string().length(6) })),
    zValidator(
      'json',
      z.object({
        name: z.string(),
        code: z.string(),
        credits: z.number(),
      })
    ),
    async (c) => {
      const { courseCode } = c.req.valid('param')
      const course = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.courseService.updateCourse(courseCode, course),
          message: 'Courses updated',
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

  public disableCourse = this.router.delete(
    '/:courseCode',
    zValidator('param', z.object({ courseCode: z.string().length(6) })),
    async (c) => {
      const { courseCode } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.courseService.disableCourse(courseCode),
          message: 'Courses disabled',
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
