import { Hono } from 'hono'
import { ScheduleDistributionService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { ScheduleDistributionDAO } from '../dao'
import { insertProfesorToSchDTO } from '../dtos/scheduleDistributionDTO'
import { z } from 'zod'

class ScheduleDistributioncontroller {
  private router = new Hono()

  private scheduleDistributionService: ScheduleDistributionDAO =
    new ScheduleDistributionService()

  public insertProfessorToScheduleProposal = this.router.post(
    '/:scheduleId/professors',
    zValidator('param', z.object({ scheduleId: z.coerce.number() })),
    zValidator('json', insertProfesorToSchDTO),
    async (c) => {
      const { scheduleId } = c.req.valid('param')
      const { professorsList } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleDistributionService.insertProfessorsToSchedule(
            scheduleId,
            professorsList
          ),
          message: 'Professors correctly added to an Schedule',
          success: true,
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

  public getCoursesScheduleDistribution = this.router.get(
    '/',
    zValidator('query', z.object({ unitId: z.coerce.number() })),
    async (c) => {
      const { unitId } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleDistributionService.getCoursesScheduleDistribution(
            { unitId }
          ),
          message: 'Courses of the Schedule Distribution',
          success: true,
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

  public updateScheduleVisibility = this.router.put(
    '/:scheduleId',
    zValidator('param', z.object({ scheduleId: z.coerce.number() })),
    zValidator('json', z.object({ visibility: z.coerce.boolean() })),
    async (c) => {
      const { scheduleId } = c.req.valid('param')
      const { visibility } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleDistributionService.updateScheduleVisibility(
            { scheduleId, visibility }
          ),
          message: 'Schedule visibility updated',
          success: true,
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

  public addSchedule = this.router.post(
    '/',
    zValidator(
      'json',
      z.object({
        unitId: z.coerce.number(),
        courseId: z.coerce.number(),
        code: z.coerce.string(),
        vacancies: z.coerce.number(),
      })
    ),
    async (c) => {
      try {
        const data = c.req.valid('json')
        const {
          term: { id },
        } = c.get('jwtPayload')
        const response: ResponseAPI = {
          data: await this.scheduleDistributionService.addSchedule({
            ...data,
            termId: id,
          }),
          message: 'Schedule added',
          success: true,
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

  public deleteSchedule = this.router.delete(
    '/:scheduleId',
    zValidator('param', z.object({ scheduleId: z.coerce.number() })),
    async (c) => {
      const { scheduleId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleDistributionService.deleteSchedule(
            scheduleId
          ),
          message: 'Schedule deleted',
          success: true,
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
}

export default ScheduleDistributioncontroller
