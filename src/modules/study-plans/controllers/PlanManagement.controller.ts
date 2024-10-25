import { zValidator } from '@hono/zod-validator'
import { PlanManagementService } from '../services'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { Hono } from 'hono'

class PlanManagementController {
  private router = new Hono()
  private planService = new PlanManagementService()

  public getPlans = this.router.get(
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

  public getPlanDetail = this.router.get(
    '/:planId',
    zValidator('param', z.object({ planId: z.string() })),
    async (c) => {
      const { planId } = c.req.valid('param')
      try {
        const response = {
          data: await this.planService.getPlanDetail(+planId),
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

  public getPlanCourses = this.router.get(
    '/:planId/courses',
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
          data: await this.planService.getPlanCourses(+planId),
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
        startLevel: z.number(),
        levelsCount: z.number(),
      })
    ),
    async (c) => {
      const { specialityId, levelsCount, startLevel } = c.req.valid('json')
      try {
        const response = {
          data: await this.planService.createPlan({
            specialityId,
            startLevel,
            levelsCount,
          }),
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
    '/:planId/courses',
    zValidator(
      'param',
      z.object({
        planId: z.string(),
      })
    ),
    zValidator(
      'json',
      z.object({
        courseId: z.number(),
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

  public updatePlan = this.router.put(
    '/:planId/courses/:courseId',
    zValidator(
      'param',
      z.object({
        planId: z.string(),
        courseId: z.string(),
      })
    ),
    zValidator(
      'json',
      z.object({
        level: z.number(),
      })
    ),
    async (c) => {
      const { planId, courseId } = c.req.valid('param')
      const { level } = c.req.valid('json')
      try {
        const response = {
          data: await this.planService.updateCourseLevel({
            studyPlanId: +planId,
            courseId: +courseId,
            level,
          }),
          message: 'Course level updated',
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
    '/:planId/courses/:courseId',
    zValidator(
      'param',
      z.object({
        planId: z.number(),
        courseId: z.number(),
      })
    ),
    async (c) => {
      const { planId, courseId } = c.req.valid('param')
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
