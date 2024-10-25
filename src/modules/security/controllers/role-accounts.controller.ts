import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import RoleAccountsService from '../services/role-accounts.service'
import { accounts, roles, units } from '@/database/schema'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { unitsSchema } from '@/database/schema/units'

class RoleAccountsController {
  private router = new Hono()
  private roleAccountsService = new RoleAccountsService()

  public getAllAccountRoles = this.router.get('/', async (c) => {
    try {
      const response: ResponseAPI = {
        data: await this.roleAccountsService.getAllAccountRoles(),
        message: 'Account roles retrieved',
        success: true,
      }
      return c.json(response)
    } catch (error) {
      if (error instanceof LyceumError) {
        c.status(error.code)
      }
      throw error
    }
  })

  private accountRoleSchema = z.object({
    accountId: z.string().uuid(),
    roleId: z.number(),
    unitId: z.number(),
  })

  public insertAccountRole = this.router.post(
    '/',
    zValidator('json', this.accountRoleSchema),
    async (c) => {
      const accountRole = c.req.valid('json')
      try {
        await this.roleAccountsService.insertAccountRole(accountRole)

        const response: ResponseAPI = {
          message: 'Account role inserted',
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

  public deleteAccountRole = this.router.delete(
    '/',
    zValidator('json', this.accountRoleSchema),
    async (c) => {
      try {
        const accountRole = c.req.valid('json')
        await this.roleAccountsService.deleteAccountRole(accountRole)

        const response: ResponseAPI = {
          message: 'Account role deleted',
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

  public getUnitScope = this.router.get(
    '/unit-scope',
    zValidator(
      'query',
      z.object({
        unitType: unitsSchema.shape.type,
      })
    ),
    async (c) => {
      const { unitType } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.roleAccountsService.getUnitScope(unitType),
          message: 'Unit scope retrieved',
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

export default RoleAccountsController
