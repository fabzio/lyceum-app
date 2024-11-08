import { Hono } from 'hono'
import { HiringSelectionService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { HiringSelectionDAO } from '../dao'
import {
  updateHiringSelectionStatusDTO,
  getCandidateHiringListDTO,
} from '../dtos'
import { z, ZodObject } from 'zod'
class HiringSelectioncontroller {
  private router = new Hono()

  private hiringSelectionService: HiringSelectionDAO =
    new HiringSelectionService()

  public updateJobRequestStatus = this.router.put(
    '/:jobRequestId/status',
    zValidator(
      'param',
      z.object({
        jobRequestId: z.string(),
      })
    ),
    zValidator('json', updateHiringSelectionStatusDTO),
    async (c) => {
      const { jobRequestId } = c.req.valid('param')
      const { accountId, newStatus, evaluationList = [] } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.updateHiringSelectionStatus(
            +jobRequestId,
            accountId,
            newStatus,
            evaluationList
          ),
          message: 'JobRequest Status correctly changed',
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

  public getHiringCandidates = this.router.get(
    '/:courseHiringId',
    zValidator(
      'param',
      z.object({
        courseHiringId: z.string(),
      })
    ),
    zValidator(
      'query',
      z.object({
        step: z.enum(['first', 'second', 'selected']),
      })
    ),
    async (c) => {
      const { courseHiringId } = c.req.valid('param')
      const { step } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.getCandidateHiringList(
            courseHiringId,
            step
          ),
          message: 'CandidateList Status correctly get',
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

  public getJobRequestDetail = this.router.get(
    '/:hiringId/:courseHiringId/:accountId',
    zValidator(
      'param',
      z.object({
        hiringId: z.string(),
        courseHiringId: z.string(),
        accountId: z.string(),
      })
    ),
    async (c) => {
      const { courseHiringId } = c.req.valid('param')
      const { accountId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.getJobRequestDetail(
            courseHiringId,
            accountId
          ),
          message: 'Job request detail retrieved successfully',
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

export default HiringSelectioncontroller
