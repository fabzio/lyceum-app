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
      .where(and(ilike(roles.name, `%${search}%`)))
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
          id: permissions.id,
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

  async removeRolePermission(roleId: number): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.delete(accountRoles).where(eq(accountRoles.roleId, roleId))
      await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId))
      await tx.delete(roles).where(eq(roles.id, roleId))
    })
  }

  async editRolePermission(rolePermission: {
    role: RolesSchema
    permissions: Permission['id'][]
  }): Promise<void> {
    await db.transaction(async (tx) => {
      // 1. Actualizar el rol
      await tx
        .update(roles)
        .set({
          name: rolePermission.role.name,
          unitType: rolePermission.role.unitType,
        })
        .where(eq(roles.id, rolePermission.role.id!))

      // 2. Obtener los permisos actuales del rol
      const existingPermissions = await tx
        .select({ permissionId: rolePermissions.permissionId })
        .from(rolePermissions)
        .where(eq(rolePermissions.roleId, rolePermission.role.id!))

      const existingPermissionIds = existingPermissions.map(
        (p) => p.permissionId
      )

      // 3. Filtrar los nuevos permisos, dejando solo los que no existen en la base de datos
      const newPermissions = rolePermission.permissions.filter(
        (permissionId) => !existingPermissionIds.includes(permissionId)
      )

      // 4. Insertar los nuevos permisos
      if (newPermissions.length > 0) {
        await tx.insert(rolePermissions).values(
          newPermissions.map((permissionId) => ({
            roleId: rolePermission.role.id!,
            permissionId,
          }))
        )
      }
    })
  }

  async removePermissionFromRole(
    roleId: number,
    permissionId: number
  ): Promise<void> {
    await db.transaction(async (tx) => {
      await tx
        .delete(rolePermissions)
        .where(
          and(
            eq(rolePermissions.roleId, roleId),
            eq(rolePermissions.permissionId, permissionId)
          )
        )
    })
  }
}

export default RolePermissionService
