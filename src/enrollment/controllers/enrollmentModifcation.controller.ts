import { Hono } from 'hono'
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'
import { EnrollmentModificationsService } from '../services'

class EnrollmentModificationController {
  private router = new Hono()
  private enrollmentService: EnrollmentModificationDAO =
    new EnrollmentModificationsService()

  public getEnrollments = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.enrollmentService.getAllEnrollments(),
      message: 'Enrollments retrieved',
      success: true,
    }
    return c.json(response)
  })

  public getEnrollment = this.router.get('/:requestNumber', async (c) => {
    const { requestNumber } = c.req.param()

    const response: ResponseAPI = {
      data: await this.enrollmentService.getEnrollmentRequest({
        requestNumber: parseInt(requestNumber),
      }),
      message: 'Request retrieved',
      success: true,
    }
    return c.json(response)
  })
}
export default EnrollmentModificationController
