import { Hono } from 'hono'
import { UnitService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { UnitsInsertSchema, unitsSchema } from '@/database/schema/units'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { insertUnitDTO } from '../dto/UnitDTO'

class UnitController {
  private router = new Hono()
  private unitService: UnitService = new UnitService()
  public getUnitsByTypePaginated = this.router.get(
    '/paginated',
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.coerce.number(),
        limit: z.coerce.number(),
        sortBy: z.string().optional(),
        unitType: z.string(),
      })
    ),
    async (c) => {
      const { q, page, limit, sortBy, unitType } = c.req.valid('query')
      try {
        const response = await this.unitService.getUnitsByTypePaginated({
          q,
          page,
          limit,
          sortBy,
          type: unitType as UnitsInsertSchema['type'],
        })
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
  public getUnitsByType = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        type: z.string(),
        q: z.string().optional(),
      })
    ),
    async (c) => {
      const { q, type } = c.req.valid('query')
      const types = type.split(',') as UnitsInsertSchema['type'][]
      try {
        const response = await this.unitService.getUnitsByType({ q, types })
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

  public getChildUnits = this.router.get(
    '/:unitId/children',
    zValidator(
      'param',
      z.object({
        unitId: z.coerce.number(),
      })
    ),
    async (c) => {
      const { unitId } = c.req.valid('param')
      try {
        const response = await this.unitService.getChildrenUnits(unitId)
        return c.json({
          data: response,
          message: 'Children units retrieved',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )

  public createUnits = this.router.post(
    '/',
    zValidator('json', z.array(insertUnitDTO)),
    async (c) => {
      const unitList = c.req.valid('json')
      try {
        await this.unitService.createUnits(unitList)
        return c.json({
          message: 'Units created',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )

  public getAccountsInUnit = this.router.get(
    '/:unitId/accounts',
    zValidator(
      'param',
      z.object({
        unitId: unitsSchema.shape.id,
      })
    ),
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.number(),
        limit: z.number(),
        sortBy: z.string().optional(),
      })
    ),
    async (c) => {
      const { unitId } = c.req.valid('param')
      const { q, page, limit, sortBy } = c.req.valid('query')
      try {
        const response = await this.unitService.getAccountsInUnit({
          unitId: +unitId!,
          q,
          page,
          limit,
          sortBy,
        })
        return c.json({
          data: response,
          message: 'Accounts retrieved',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )

  public getRolesOfUnitType = this.router.get(
    '/roles',
    zValidator(
      'query',
      z.object({
        type: unitsSchema.shape.type,
      })
    ),
    async (c) => {
      const { type } = c.req.valid('query')
      try {
        const response = await this.unitService.getRolesOfUnitType(type)
        return c.json({
          data: response,
          message: 'Roles retrieved',
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
