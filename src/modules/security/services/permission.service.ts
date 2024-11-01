import db from '@/database'
import { eq } from 'drizzle-orm'

import { Permission } from '@/interfaces/models/Permission'
import { PermissionDAO } from '../dao/PermissionDAO'
import { modules, permissions } from '@/database/schema'
import { Module } from '@/interfaces/models/Module'

class PermissionService implements PermissionDAO {
  async getAllPermissions(): Promise<Permission[]> {
    const permissionsResponse = (await db
      .select({
        id: permissions.id,
        description: permissions.description,
        moduleName: modules.name,
      })
      .from(permissions)
      .innerJoin(modules, eq(permissions.moduleId, modules.id))) as Permission[]
    return permissionsResponse
  }

  async getPermissionByModule(mouduleId: Module['id']): Promise<Permission[]> {
    const permissionsResponse = (await db
      .select({
        id: permissions.id,
        description: permissions.description,
        moduleName: modules.name,
      })
      .from(permissions)
      .innerJoin(modules, eq(permissions.moduleId, modules.id))
      .where(eq(permissions.moduleId, mouduleId))) as Permission[]
    return permissionsResponse
  }
}

export default PermissionService
