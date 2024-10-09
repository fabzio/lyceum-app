import { Hono } from 'hono'
import { EnrollmentDAO } from '../dao/EnrollmentDAO'
import EnrollmentService from '../services/enrollment.service'

class EnrollmentController {
  private router = new Hono()
  private enrollmentService: EnrollmentDAO = new EnrollmentService()

  public getEnrollments = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.enrollmentService.getAllEnrollments(),
      message: 'Enrollments retrieved',
      success: true,
    }
    return c.json(response)
  })
  /*
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
  */
}
export default EnrollmentController