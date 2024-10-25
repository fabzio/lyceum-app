import { Hono } from 'hono'
import { StudentService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { StudentDAO } from '../daos/StudentDAO'

class StudentController {
  private router = new Hono()
  private studentService: StudentDAO = new StudentService()

  public getStudentDetail = this.router.get(
    '/:code',
    zValidator(
      'param',
      z.object({
        code: z.string().length(8),
      })
    ),
    async (c) => {
      const { code } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.studentService.getStudentDetail({ code }), // llamada al servicio
          success: true,
          message: 'Student retrived',
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

  public getStudents = this.router.get(
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
      try {
        const filters = c.req.valid('query')
        const data = await this.studentService.getAllStudents(filters)
        const response: ResponseAPI = {
          //TODO: Cambiar el mock data por la llamada al servicio
          data: data,
          success: true,
          message: 'Students retrived',
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

export default StudentController
