import db from '@/database'

import { modules, permissions, rolePermissions, roles } from '@/database/schema'

import { RolePermissionDAO } from '../dao/RolePermissionsDAO'
import { RolePermission } from '@/interfaces/models/RolePermission'
import { eq } from 'drizzle-orm'
import { Permission } from '@/interfaces/models/Permission'
import { RolesSchema } from '@/database/schema/roles'

class RolePermissionService implements RolePermissionDAO {
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
}

export default RolePermissionService
