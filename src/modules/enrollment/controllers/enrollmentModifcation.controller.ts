import { Hono } from 'hono'
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'
import { EnrollmentModificationsService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { createEnrollmentModificationDTO } from '../dtos'

class EnrollmentModificationController {
  private router = new Hono()
  private enrollmentService: EnrollmentModificationDAO =
    new EnrollmentModificationsService()

  public getEnrollments = this.router.get(
    '/paginated',
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.string().transform((v) => parseInt(v)),
        limit: z.string().transform((v) => parseInt(v)),
        sortBy: z.string().optional(),
        specialityId: z.string().transform((v) => parseInt(v)),
        eqnumber: z
          .string()
          .optional()
          .transform((v) => (v ? parseInt(v) : undefined)),
      })
    ),
    async (c) => {
      try {
        const filters = c.req.valid('query')
        const data =
          await this.enrollmentService.getAllEnrollmentsOfSpeciality(filters)
        const response: ResponseAPI = {
          data: data,
          success: true,
          message: 'Enrollments retrieved',
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
        observation: z.string().optional(),
      })
    ),
    async (c) => {
      const { requestNumber } = c.req.param()
      const { state, observation } = c.req.valid('json')

      await this.enrollmentService.updateEnrollmentRequestResponse({
        requestNumber: parseInt(requestNumber),
        state,
        observation,
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
    zValidator('json', createEnrollmentModificationDTO),
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

  public getStudentEnrollments = this.router.get(
    '/student/:studentId',
    zValidator(
      'query',
      z.object({
        page: z.string().transform((v) => parseInt(v)),
        limit: z.string().transform((v) => parseInt(v)),
        sortBy: z.string().optional(),
      })
    ),
    async (c) => {
      const { studentId } = c.req.param()
      const filters = c.req.valid('query')
      try {
        const data = await this.enrollmentService.getStudentEnrollments({
          studentId,
          ...filters,
        })
        const response: ResponseAPI = {
          data: data,
          success: true,
          message: 'Student enrollments retrieved',
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
