import { Hono } from 'hono'
import { ScheduleProposalService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import ScheduleProposalDAO from '../dao/scheduleProposalDAO'
import {
  insertCourseToSchPropDTO,
  insertScheduleProposalDTO,
  updateScheduleProposalStatusDTO,
} from '../dtos/scheduleProposalDTO'
import { z, ZodObject } from 'zod'

class ScheduleProposalController {
  private router = new Hono()

  private scheduleProposalService: ScheduleProposalDAO =
    new ScheduleProposalService()

  public insertCourseToScheduleProposal = this.router.post(
    '/:enrollmentProposalId/courses',
    zValidator(
      'param',
      z.object({
        enrollmentProposalId: z.string(),
      })
    ),
    zValidator('json', insertCourseToSchPropDTO),
    async (c) => {
      const { coursesList } = c.req.valid('json')
      const { enrollmentProposalId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.insertCourseToScheduleProposal(
            +enrollmentProposalId,
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

  public updateScheduleProposalStatus = this.router.put(
    '/:enrollmentProposalId/courses',
    zValidator(
      'param',
      z.object({
        enrollmentProposalId: z.string(),
      })
    ),
    zValidator('json', updateScheduleProposalStatusDTO),
    async (c) => {
      const { enrollmentProposalId } = c.req.valid('param')
      const { newStatus, coursesList } = c.req.valid('json')
      try {
        await this.scheduleProposalService.updateScheduleProposalStatus(
          +enrollmentProposalId,
          newStatus
        )
        return c.json({
          message: 'Status updated successfully',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )

  public insertScheduleProposal = this.router.post(
    '/',
    zValidator('json', insertScheduleProposalDTO),
    async (c) => {
      const { facultyId, accountId } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.insertScheduleProposal(
            facultyId,
            accountId
          ),
          message: 'Schedule Proposal created successfully',
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
