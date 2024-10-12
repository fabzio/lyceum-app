import { Module } from '@/interfaces/models/Module'

export interface ModuleDAO {
  getAllModules: () => Promise<Module[]>
}
