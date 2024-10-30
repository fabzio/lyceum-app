import { Hono } from 'hono'
import { ScheduleDistributionService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import EnrollmentApprovalService from '../services/enrollmentApproval.service'
import EnrollmentApprovalDAO from '../dao/enrollmentApprovalDAO'
import { changeStateToApprovedDTO } from '../dtos/enrollmentApprovalDTO'

class EnrollmentApprovalcontroller {
  private router = new Hono()

  private scheduleDistributionService: EnrollmentApprovalDAO =
    new EnrollmentApprovalService()

  public changeProposedEnrollmentToApproved = this.router.post(
    '/changeToApproved/',
    zValidator('json', changeStateToApprovedDTO),
    async (c) => {
      const { enrollmentProposalId } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleDistributionService.changeSentToApproved(
            enrollmentProposalId
          ),
          message: 'Proposed enrollment correctly approved',
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

export default EnrollmentApprovalcontroller
