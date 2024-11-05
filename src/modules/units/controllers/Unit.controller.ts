import { Hono } from 'hono'
import { UnitService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { unitsSchema } from '@/database/schema/units'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class UnitController {
  private router = new Hono()
  private unitService: UnitService = new UnitService()

  public getUnits = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        type: unitsSchema.shape.type,
      })
    ),
    async (c) => {
      const { type } = c.req.valid('query')
      try {
        const response = await this.unitService.getUnitsByType(type)
        return c.json({
          data: response,
          message: 'Units retrieved',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )
}

export default UnitController
