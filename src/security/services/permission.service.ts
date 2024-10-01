import db from '@/database'
import { eq } from 'drizzle-orm'

import { Permission } from '@/interfaces/models/Permission'
import { PermissionDAO } from '../dao/PermissionDAO'
import { moduleInDev, permissionsInDev } from '@/database/migrations/schema'
import { Module } from '@/interfaces/models/Module'

class PermissionService implements PermissionDAO {
  async getAllPermissions(): Promise<Permission[]> {
    const permissions = (await db
      .select({
        id: permissionsInDev.id,
        description: permissionsInDev.description,
        moduleName: moduleInDev.name,
      })
      .from(permissionsInDev)
      .innerJoin(
        moduleInDev,
        eq(permissionsInDev.moduleId, moduleInDev.id)
      )) as Permission[]
    return permissions
  }

  async getPermissionByModule(mouduleId: Module['id']): Promise<Permission[]> {
    const permissions = (await db
      .select({
        id: permissionsInDev.id,
        description: permissionsInDev.description,
        moduleName: moduleInDev.name,
      })
      .from(permissionsInDev)
      .innerJoin(moduleInDev, eq(permissionsInDev.moduleId, moduleInDev.id))
      .where(eq(permissionsInDev.moduleId, mouduleId))) as Permission[]
    return permissions
  }
}

export default PermissionService
