import db from '@/database'

import {
  accountRoles,
  modules,
  permissions,
  rolePermissions,
  roles,
} from '@/database/schema'

import { RolePermissionDAO } from '../dao/RolePermissionsDAO'
import { RolePermission } from '@/interfaces/models/RolePermission'
import { and, eq, ilike } from 'drizzle-orm'
import { Permission } from '@/interfaces/models/Permission'
import { RolesSchema } from '@/database/schema/roles'

class RolePermissionService implements RolePermissionDAO {
  async searchRolePermissions(search: string): Promise<
    {
      id: number
      name: string
      unitType: string
    }[]
  > {
    return await db
      .select({
        id: roles.id,
        name: roles.name,
        unitType: roles.unitType,
      })
      .from(roles)
      .where(and(ilike(roles.name, `%${search}%`), eq(roles.editable, true)))
  }
  async getAllRolePermissions(): Promise<RolePermission[]> {
    const rolePermissionsResponse = await db
      .select({
        role: {
          id: roles.id,
          name: roles.name,
          unitType: roles.unitType,
        },
        permission: {
          description: permissions.description,
          moduleName: modules.name,
        },
      })
      .from(rolePermissions)
      .innerJoin(roles, eq(rolePermissions.roleId, roles.id))
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .innerJoin(modules, eq(permissions.moduleId, modules.id))
      .where(eq(roles.editable, true))

    return rolePermissionsResponse as RolePermission[]
  }
  async insertRolePermission(rolePermission: {
    role: RolesSchema
    permissions: Permission['id'][]
  }): Promise<any> {
    await db.transaction(async (tx) => {
      const [{ newRoleId }] = await tx
        .insert(roles)
        .values({
          name: rolePermission.role.name,
          unitType: rolePermission.role.unitType,
        })
        .returning({ newRoleId: roles.id })

      await tx.insert(rolePermissions).values(
        rolePermission.permissions.map((permissionId) => ({
          roleId: newRoleId,
          permissionId,
        }))
      )
    })
  }

  async removeRolePermission(roleId: number): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.delete(accountRoles).where(eq(accountRoles.roleId, roleId))
      await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId))
      await tx.delete(roles).where(eq(roles.id, roleId))
    })
  }
}

export default RolePermissionService
