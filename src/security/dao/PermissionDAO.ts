import { Module } from '@/interfaces/models/Module'
import { Permission } from '@/interfaces/models/Permission'

export interface PermissionDAO {
  getAllPermissions: () => Promise<Permission[]>
  getPermissionByModule: (mouduleId: Module['id']) => Promise<Permission[]>
}
