import { Hono } from 'hono'
import { RiskStudentDAO } from '../dao/RiskStudentDAO'
import RiskStudentService from '../services/riskStudent.service'
import { zValidator } from '@hono/zod-validator'
import {
  insertRiskStudentsDTO,
} from '../dto/riskStudentDTO'

class RiskStudentController {
  private router = new Hono()
  private permissionService: RiskStudentDAO = new RiskStudentService()

  public getRiskStudents = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.permissionService.getAllRiskStudent(),
      message: 'RiskStudent retrieved',
      success: true,
    }
    return c.json(response)
  })

  public getRiskStudentReports = this.router.get('/:code', async (c) => {
    const { code } = c.req.param()
    const scheduleId = c.req.query('scheduleId')

    const response: ResponseAPI = {
      data: await this.permissionService.getRiskStudentReports({
        studentCode: code,
        scheduleId: parseInt(scheduleId!),
      }),
      message: 'RiskStudentReports retrieved',
      success: true,
    }
    return c.json(response)
  })

  public insertRiskStudents = this.router.post(
    '/',
    zValidator('json', insertRiskStudentsDTO),
    async (c) => {
      const { studentList } = c.req.valid('json')
      const response: ResponseAPI = {
        data: await this.permissionService.insertRiskStudents(studentList),
        message: 'RiskStudent inserted',
        success: true,
      }
      return c.json(response)
    }
  )

  public updateRiskStudent = this.router.put('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.permissionService.updateRiskStudents(),
      message: 'RiskStudent updated',
      success: true,
    }
    return c.json(response)
  })
}
export default RiskStudentController
