import { Context, Hono } from 'hono'
import { RiskStudentDAO } from '../dao/RiskStudentDAO'
import RiskStudentService from '../services/riskStudent.service'

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
}
export default RiskStudentController
