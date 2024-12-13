import { Hono } from 'hono'
import { studentsLeadsService } from '../services'
import { zValidator } from '@hono/zod-validator'
import {
  deleteRiskStudentDTO,
  insertRiskStudentReportDTO,
} from '../dto/riskStudentReportDTO'
import { z } from 'zod'

class StudentLeadsController {
  private router = new Hono()
  private StudentLeadsService = new studentsLeadsService()

  public getLeadsStudentsOfSpecility = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.string().transform((v) => parseInt(v)),
        limit: z.string().transform((v) => parseInt(v)),
        sortBy: z.string().optional(),
        specialityId: z.string().transform((v) => parseInt(v)),
        idTerm: z
          .string()
          .optional()
          .transform((v) => (v ? parseInt(v) : undefined)),
      })
    ),
    async (c) => {
      const params = c.req.valid('query')
      const response: ResponseAPI = {
        data: await this.StudentLeadsService.getAllStudentLeadsOfSpeciality(
          params
        ),
        message: 'LeadsStudent retrieved',
        success: true,
      }
      return c.json(response)
    }
  )
}

export default StudentLeadsController
