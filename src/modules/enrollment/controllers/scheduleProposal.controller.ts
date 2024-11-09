import { Hono } from 'hono'
import { ScheduleProposalService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import {
  insertCourseToSchPropDTO,
  insertScheduleProposalDTO,
  updateScheduleProposalStatusDTO,
  updateCoursesOfASchPropDTO,
  deleteCoursesOfASchPropDTO,
} from '../dtos'
import { z, ZodObject } from 'zod'
import { ScheduleProposalDAO } from '../dao'
import {
  getScheduleProposalCoursesDTO,
  getScheduleProposalsInUnitDTO,
} from '../dtos/scheduleProposalDTO'

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
    '/:enrollmentProposalId',
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
          +enrollmentProposalId, //El + que está adelante convierte a entero
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
      const { facultyId, accountId, termId } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.insertScheduleProposal(
            facultyId,
            accountId,
            termId
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

  public getScheduleProposalsInUnit = this.router.get(
    '/',
    zValidator('query', getScheduleProposalsInUnitDTO),
    async (c) => {
      const params = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.getScheduleProposalsInUnit({
            limit: +params.limit,
            page: +params.page,
            sortBy: params.sortBy,
            unitId: +params.unitId,
          }),
          message: 'Schedule Proposals obtained successfully',
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

  public updateCoursesInScheduleProposal = this.router.put(
    '/:enrollmentProposalId/courses',
    zValidator(
      'param',
      z.object({
        enrollmentProposalId: z.string(),
      })
    ),
    zValidator('json', updateCoursesOfASchPropDTO),
    async (c) => {
      const { coursesList } = c.req.valid('json')
      const { enrollmentProposalId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.updateCoursesInScheduleProposal(
            +enrollmentProposalId,
            coursesList
          ),
          message: 'Courses correctly updated to an Schedule Proposal',
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

  public getProposal = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        specialityId: z.string(),
        termId: z.string().optional(),
      })
    ),
    async (c) => {
      const { specialityId, termId } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.getProposal(
            parseInt(specialityId),
            termId ? parseInt(termId) : undefined
          ),
          message: 'Proposal retrieved successfully',
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

  public getCoursesProposal = this.router.get(
    '/:enrollmentProposalId',
    zValidator('query', getScheduleProposalCoursesDTO),
    zValidator(
      'param',
      z.object({
        enrollmentProposalId: z.string(),
      })
    ),
    async (c) => {
      const params = c.req.valid('query')
      const { enrollmentProposalId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.getCoursesProposal({
            limit: +params.limit,
            page: +params.page,
            sortBy: params.sortBy,
            proposalID: +parseInt(enrollmentProposalId),
          }),
          message: 'Courses retrieved successfully',
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

  public deleteCourseFromScheduleProposal = this.router.delete(
    '/:enrollmentProposalId/courses',
    zValidator(
      'param',
      z.object({
        enrollmentProposalId: z.string(),
      })
    ),
    zValidator('json', deleteCoursesOfASchPropDTO),
    async (c) => {
      const { coursesList } = c.req.valid('json')
      const { enrollmentProposalId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.scheduleProposalService.deleteCoursesInScheduleProposal(
            +enrollmentProposalId,
            coursesList
          ),
          message: 'Courses correctly deleted to an Schedule Proposal',
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
