import db from '@/database'
import { moduleInDev } from '@/database/migrations/schema'
import { ModuleDAO } from '../dao/ModuleDAO'
import { Module } from '@/interfaces/models/Module'

class ModuleService implements ModuleDAO {
  async getAllModules(): Promise<Module[]> {
    const modules = (await db
      .select({
        id: moduleInDev.id,
        name: moduleInDev.name,
      })
      .from(moduleInDev)) as Module[]
    return modules
  }
}

export default ModuleService
