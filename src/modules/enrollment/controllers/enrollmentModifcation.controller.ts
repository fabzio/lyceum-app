import { Hono } from 'hono'
import { EnrollmentModificationDAO } from '../dao/enrollmentModificationDAO'
import { EnrollmentModificationsService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createEnrollmentModificationDTO } from '../dtos/createEnrollmentModificationDTO'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class EnrollmentModificationController {
  private router = new Hono()
  private enrollmentService: EnrollmentModificationDAO =
    new EnrollmentModificationsService()

    public createEnrollment = this.router.post(
      '/',
      zValidator('json', createEnrollmentModificationDTO),
      async (c) => {
        const enrollmentModificationData = c.req.valid('json');
    
        // Desestructuramos los datos validados
        const {
          studentId,
          scheduleId,
          state,
          requestType,
          reason,
        } = enrollmentModificationData;
    
        try {
          await this.enrollmentService.createEnrollmentModification(
            studentId,
            scheduleId,
            state,
            requestType,
            reason
          );
    
          const response: ResponseAPI = {
            data: null, // No hay datos específicos que retornar, ya que la operación es un 'void'
            message: 'Enrollment modification created successfully',
            success: true,
          };
          return c.json(response);
        } catch (error) {
          // Manejo de errores potenciales del servicio
          console.error('Error creating enrollment modification:', error);
          if (error instanceof LyceumError) {
            c.status(error.code);
          } else {
            c.status(500); // Internal Server Error
          }
          return c.json({ success: false, message: 'Failed to create enrollment modification' });
        }
      }
    );

    public getEnrollments = this.router.get(
      '/paginated',
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
        try {
          const filters = c.req.valid('query');
          const data = await this.enrollmentService.getAllEnrollments(filters);
          const response: ResponseAPI = {
            data: data,
            success: true,
            message: 'Enrollments retrieved',
          };
          return c.json(response);
        } catch (error) {
          if (error instanceof LyceumError) {
            c.status(error.code);
          }
          throw error;
        }
      }
    );

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
}
export default EnrollmentModificationController
