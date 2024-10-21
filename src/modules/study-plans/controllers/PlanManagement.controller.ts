import { zValidator } from '@hono/zod-validator'
import { PlanManagementService } from '../services'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { Hono } from 'hono'

class PlanManagementController {
  private router = new Hono()
  private planService = new PlanManagementService()

  public getPLans = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        specialityId: z.string(),
      })
    ),
    async (c) => {
      const { specialityId } = c.req.valid('query')
      try {
        const response = {
          data: await this.planService.getPlans(+specialityId),
          message: 'Plans retrieved',
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

  public getPlanById = this.router.get(
    '/:planId',
    zValidator(
      'param',
      z.object({
        planId: z.string(),
      })
    ),
    async (c) => {
      const { planId } = c.req.valid('param')
      try {
        const response = {
          data: await this.planService.getPlanById(+planId),
          message: 'Plan retrieved',
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

  public createPlan = this.router.post(
    '/',
    zValidator(
      'json',
      z.object({
        specialityId: z.number(),
      })
    ),
    async (c) => {
      const { specialityId } = c.req.valid('json')
      try {
        const response = {
          data: await this.planService.createPlan(+specialityId),
          message: 'Plan created',
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

  public addCourseToPlan = this.router.post(
    '/:planId',
    zValidator(
      'param',
      z.object({
        planId: z.string(),
      })
    ),
    zValidator(
      'json',
      z.object({
        courseId: z.string(),
        level: z.number(),
      })
    ),
    async (c) => {
      const { planId } = c.req.valid('param')
      const { courseId, level } = c.req.valid('json')
      try {
        const response = {
          data: await this.planService.addCourseToPlan({
            studyPlanId: +planId,
            courseId: +courseId,
            level,
          }),
          message: 'Course added to plan',
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

  public removeCourseFromPlan = this.router.delete(
    '/:planId',
    zValidator(
      'param',
      z.object({
        planId: z.string(),
      })
    ),
    zValidator(
      'json',
      z.object({
        courseId: z.string(),
      })
    ),
    async (c) => {
      const { planId } = c.req.valid('param')
      const { courseId } = c.req.valid('json')
      try {
        const response = {
          data: await this.planService.removeCourseFromPlan({
            studyPlanId: +planId,
            courseId: +courseId,
          }),
          message: 'Course removed from plan',
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

export default PlanManagementController
