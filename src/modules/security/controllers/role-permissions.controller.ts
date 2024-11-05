import { Hono } from 'hono'
import { RolePermissionDAO } from '../dao/RolePermissionsDAO'
import RolePermissionService from '../services/role-permissions.service'
import { rolesSchema } from '@/database/schema/roles'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class RolePermissionsController {
  private router = new Hono()
  private permissionService: RolePermissionDAO = new RolePermissionService()

  public getRolePermissions = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.permissionService.getAllRolePermissions(),
      message: 'Role permissions retrieved',
      success: true,
    }

    return c.json(response)
  })

  public searchRolePermissions = this.router.get(
    '/search',
    zValidator(
      'query',
      z.object({
        q: z.string(),
      })
    ),
    async (c) => {
      const { q } = c.req.valid('query')

      const response: ResponseAPI = {
        data: await this.permissionService.searchRolePermissions(q),
        message: 'Role permissions retrieved',
        success: true,
      }

      return c.json(response)
    }
  )

  public insertRolePermission = this.router.post(
    '/',
    zValidator(
      'json',
      z.object({
        role: rolesSchema,
        permissions: z.array(z.number()),
      })
    ),
    (c) => {
      const rolePermission = c.req.valid('json')

      try {
        const response: ResponseAPI = {
          data: this.permissionService.insertRolePermission(rolePermission),
          message: 'Role permission inserted',
          success: true,
        }

        return c.json(response)
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )

  public deleteRolePermission = this.router.delete(
    '/:roleId',
    zValidator(
      'param',
      z.object({
        roleId: z.string(),
      })
    ),
    async (c) => {
      const { roleId } = c.req.valid('param')

      const response: ResponseAPI = {
        data: await this.permissionService.removeRolePermission(+roleId),
        message: 'Role permission deleted',
        success: true,
      }

      return c.json(response)
    }
  )
}
export default RolePermissionsController
