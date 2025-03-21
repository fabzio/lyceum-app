import { Hono } from 'hono'
import { StudentService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { StudentDAO } from '../daos/StudentDAO'
import { createStudentsDTO } from '../dtos/StudentDTO'

class StudentController {
  private router = new Hono()
  private studentService: StudentDAO = new StudentService()

  public createStudent = this.router.post(
    '/',
    zValidator('json', createStudentsDTO),
    async (c) => {
      const { studentList } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.studentService.createStudent(studentList),
          message: 'Students created',
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
          return c.json({ success: false, message: error.message }); // Ensure response
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
