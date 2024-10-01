import db from '@/database'

import {
  moduleInDev,
  permissionsInDev,
  rolePermissionsInDev,
  rolesInDev,
  unitTypeInDev,
} from '@/database/migrations/schema'

import { RolePermissionDAO } from '../dao/RolePermissionsDAO'
import { RolePermission } from '@/interfaces/models/RolePermission'
import { eq } from 'drizzle-orm'
import { Permission } from '@/interfaces/models/Permission'
import { RolesSchema } from '@/database/schema/roles'

class RolePermissionService implements RolePermissionDAO {
  async getAllRolePermissions(): Promise<RolePermission[]> {
    const rolePermissions = await db
      .select({
        role: {
          id: rolesInDev.id,
          name: rolesInDev.name,
          unitType: rolesInDev.unitType,
        },
        permission: {
          description: permissionsInDev.description,
          moduleName: moduleInDev.name,
        },
      })
      .from(rolePermissionsInDev)
      .innerJoin(rolesInDev, eq(rolePermissionsInDev.roleId, rolesInDev.id))
      .innerJoin(
        permissionsInDev,
        eq(rolePermissionsInDev.permissionId, permissionsInDev.id)
      )
      .innerJoin(moduleInDev, eq(permissionsInDev.moduleId, moduleInDev.id))

    return rolePermissions as RolePermission[]
  }
  async insertRolePermission(rolePermission: {
    role: RolesSchema
    permissions: Permission['id'][]
  }): Promise<any> {
    await db.transaction(async (tx) => {
      const [{ newRoleId }] = await tx
        .insert(rolesInDev)
        .values({
          name: rolePermission.role.name,
          unitType: rolePermission.role.unitType,
        })
        .returning({ newRoleId: rolesInDev.id })

      await tx.insert(rolePermissionsInDev).values(
        rolePermission.permissions.map((permissionId) => ({
          roleId: newRoleId,
          permissionId,
        }))
      )
    })
  }
}

export default RolePermissionService
