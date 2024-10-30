import { Hono } from 'hono'
import { ScheduleProposalService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import scheduleProposalDAO from '../dao/scheduleProposalDAO'
import { insertCourseToSchPropDTO } from '../dtos/scheduleProposalDTO'

class ScheduleProposalController {
  private router = new Hono()

  private scheduleProposalService: scheduleProposalDAO =
    new ScheduleProposalService()

  public insertCourseToScheduleProposal = this.router.post(
    '/',
    zValidator('json', insertCourseToSchPropDTO),
    async (c) => {
      const { enrollmentProposalId, coursesList } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.insertCourseToScheduleProposal(
            enrollmentProposalId,
            coursesList
          ),
          message: 'Courses correctly added to an Schedule Proposal',
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

export default ScheduleProposalController
