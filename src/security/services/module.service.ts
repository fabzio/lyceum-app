import db from '@/database'
import { modules } from '@/database/schema'
import { ModuleDAO } from '../dao/ModuleDAO'
import { Module } from '@/interfaces/models/Module'

class ModuleService implements ModuleDAO {
  async getAllModules(): Promise<Module[]> {
    const modulesReponse = (await db
      .select({
        id: modules.id,
        name: modules.name,
      })
      .from(modules)) as Module[]
    return modulesReponse
  }
}

export default ModuleService
