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
  
  public getEnrollment = this.router.get('/:requestId', async (c) => {
    const { requestId } = c.req.param()

    const response: ResponseAPI = {
      data: await this.enrollmentService.getEnrollmentRequest({
        requestId: parseInt(requestId!),
      }),
      message: 'Request retrieved',
      success: true,
    }
    return c.json(response)
  })

}
export default EnrollmentController