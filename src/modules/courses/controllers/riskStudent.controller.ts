import { Hono } from 'hono'
import { RiskStudentDAO } from '../dao/RiskStudentDAO'
import RiskStudentService from '../services/riskStudent.service'
import { zValidator } from '@hono/zod-validator'
import {
  insertOneRiskStudentsDTO,
  insertRiskStudentsDTO,
} from '../dto/riskStudentDTO'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class RiskStudentController {
  private router = new Hono()
  private riskStudentService: RiskStudentDAO = new RiskStudentService()

  public getRiskStudentsOfSpecility = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.string().transform((v) => parseInt(v)),
        limit: z.string().transform((v) => parseInt(v)),
        sortBy: z.string().optional(),
        specialityId: z.string().transform((v) => parseInt(v)),
      })
    ),
    async (c) => {
      const params = c.req.valid('query')
      const response: ResponseAPI = {
        data: await this.riskStudentService.getAllRiskStudentOfSpeciality(
          params
        ),
        message: 'RiskStudent retrieved',
        success: true,
      }
      return c.json(response)
    }
  )

  public getRiskStudentsOfProfessor = this.router.get(
    '/professor/:professorId',
    zValidator(
      'param',
      z.object({
        professorId: z.string(),
      })
    ),
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
      const { professorId } = c.req.valid('param')
      const params = c.req.valid('query')
      const response: ResponseAPI = {
        data: await this.riskStudentService.getAllRiskStudentOfProfessor({
          professorId,
          ...params,
        }),
        message: 'RiskStudent retrieved',
        success: true,
      }
      return c.json(response)
    }
  )

  public getRiskStudentDetail = this.router.get(
    '/:code',
    zValidator(
      'param',
      z.object({
        code: z.string().regex(/^[0-9]{8}$/),
      })
    ),
    zValidator('query', z.object({ scheduleId: z.string() })),
    async (c) => {
      const { code } = c.req.valid('param')
      const { scheduleId } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.riskStudentService.getRiskStudentDetail({
            studentCode: code,
            scheduleId: +scheduleId,
          }),
          message: 'RiskStudentDetail retrieved',
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

  public getRiskStudentReports = this.router.get(
    '/:code/reports',
    zValidator(
      'param',
      z.object({
        code: z.string().regex(/^[0-9]{8}$/),
      })
    ),
    zValidator('query', z.object({ scheduleId: z.string() })),
    async (c) => {
      const { code } = c.req.valid('param')
      const { scheduleId } = c.req.valid('query')

      const response: ResponseAPI = {
        data: await this.riskStudentService.getRiskStudentReports({
          studentCode: code,
          scheduleId: +scheduleId,
        }),
        message: 'RiskStudentReports retrieved',
        success: true,
      }
      return c.json(response)
    }
  )

  public insertRiskStudents = this.router.post(
    '/',
    zValidator('json', insertRiskStudentsDTO),
    async (c) => {
      const { studentList } = c.req.valid('json')
      const response: ResponseAPI = {
        data: await this.riskStudentService.insertRiskStudents(studentList),
        message: 'RiskStudent inserted',
        success: true,
      }
      return c.json(response)
    }
  )

  public updateRiskStudent = this.router.put(
    '/',
    zValidator(
      'json',
      z.object({
        specialityId: z.number(),
      })
    ),
    async (c) => {
      const { specialityId } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.riskStudentService.updateRiskStudentsOfFaculty({
            specialityId,
          }),
          message: 'RiskStudent updated',
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

  public insertOneRiskStudents = this.router.post(
    '/One/',
    zValidator('json', insertOneRiskStudentsDTO),
    async (c) => {
      const studentData = c.req.valid('json')
      const response: ResponseAPI = {
        data: await this.riskStudentService.insertOneRiskStudents(studentData),
        message: 'RiskStudent inserted',
        success: true,
      }
      return c.json(response)
    }
  )
}
export default RiskStudentController
