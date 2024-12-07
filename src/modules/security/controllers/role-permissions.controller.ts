import { Hono } from 'hono'
import { RolePermissionDAO } from '../dao/RolePermissionsDAO'
import RolePermissionService from '../services/role-permissions.service'
import { rolesSchema } from '@/database/schema/roles'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { UnitType } from '@/interfaces/enums/UnitType'

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

  public editRolePermission = this.router.put(
    '/',
    zValidator(
      'json',
      z.object({
        role: rolesSchema,
        permissions: z.array(z.number()),
      })
    ),
    async (c) => {
      const rolePermission = c.req.valid('json')

      try {
        const response: ResponseAPI = {
          data: await this.permissionService.editRolePermission(rolePermission),
          message: 'Role permission updated successfully',
          success: true,
        }

        return c.json(response)
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )

  public deletePermissionFromRole = this.router.delete(
    '/deletePermissionFromRole/:roleId/:permissionId',
    zValidator(
      'param',
      z.object({
        roleId: z.preprocess((val) => Number(val), z.number()),
        permissionId: z.preprocess((val) => Number(val), z.number()),
      })
    ),
    async (c) => {
      const { roleId, permissionId } = c.req.valid('param')

      await this.permissionService.removePermissionFromRole(
        roleId,
        permissionId
      )

      const response: ResponseAPI = {
        data: null,
        message: 'Permission removed from role successfully',
        success: true,
      }

      return c.json(response)
    }
  )
}
export default RolePermissionsController
