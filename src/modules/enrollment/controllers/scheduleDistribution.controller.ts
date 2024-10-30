import { Hono } from 'hono'
import { ScheduleDistributionService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { ScheduleDistributionDAO } from '../dao'
import { insertProfesorToSchDTO } from '../dtos/scheduleDistributionDTO'

class ScheduleDistributioncontroller {
  private router = new Hono()

  private scheduleDistributionService: ScheduleDistributionDAO =
    new ScheduleDistributionService()

  public insertProfessorToScheduleProposal = this.router.post(
    '/Professors/',
    zValidator('json', insertProfesorToSchDTO),
    async (c) => {
      const { scheduleId, professorsList } = c.req.valid('json')
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
}

export default ScheduleDistributioncontroller
