import { Hono } from 'hono'
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'
import { EnrollmentModificationsService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

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

  public updateEnrollment = this.router.put(
    '/:requestNumber',
    zValidator(
      'json',
      z.object({
        state: z.enum(['approved', 'denied']),
      })
    ),
    async (c) => {
      const { requestNumber } = c.req.param()
      const { state } = c.req.valid('json')

      await this.enrollmentService.updateEnrollmentRequestResponse({
        requestNumber: parseInt(requestNumber),
        state,
      })

      const response: ResponseAPI = {
        message: 'Request updated',
        success: true,
        data: null,
      }
      return c.json(response)
    }
  )
}
export default EnrollmentModificationController
