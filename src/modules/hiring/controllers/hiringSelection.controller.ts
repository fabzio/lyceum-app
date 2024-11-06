import { Hono } from 'hono'
import { HiringSelectionService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { HiringSelectionDAO } from '../dao'
import { updateHiringSelectionStatusDTO } from '../dtos'
import { z, ZodObject } from 'zod'
class HiringSelectioncontroller {
  private router = new Hono()

  private hiringSelectionService: HiringSelectionDAO =
    new HiringSelectionService()

  public updateJobRequestStatus = this.router.put(
    '/:jobRequestId',
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
}

export default HiringSelectioncontroller
