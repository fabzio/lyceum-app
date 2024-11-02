import { Hono } from 'hono'
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'
import { EnrollmentModificationsService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { enrollmentModificationsSchema } from '@/database/schema/enrollmentModifications'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { createEnrollmentModifications } from '../dtos'

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
        state: z.enum(['approved', 'denied', 'requested']),
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

  public createEnrollment = this.router.post(
    '/',
    zValidator('json', createEnrollmentModifications),
    async (c) => {
      const newEnrollmentModify = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.enrollmentService.createEnrollmentRequest(
            newEnrollmentModify
          ),
          message: 'Request created',
          success: true,
        }
        return c.json(response)
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )
}
export default EnrollmentModificationController
