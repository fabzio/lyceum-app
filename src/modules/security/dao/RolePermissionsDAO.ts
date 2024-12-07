import { RolesSchema } from '@/database/schema/roles'
import { Permission } from '@/interfaces/models/Permission'
import { RolePermission } from '@/interfaces/models/RolePermission'

export interface RolePermissionDAO {
  searchRolePermissions: (
    search: string
  ) => Promise<{ id: number; name: string; unitType: string }[]>
  getAllRolePermissions: () => Promise<RolePermission[]>
  insertRolePermission: (rolePermission: {
    role: RolesSchema
    permissions: Permission['id'][]
  }) => Promise<RolePermission>
  removeRolePermission: (rolePermission: number) => Promise<void>
  editRolePermission: (rolePermission: {
    role: RolesSchema
    permissions: Permission['id'][]
  }) => Promise<void>
  removePermissionFromRole: (
    roleId: number,
    permissionId: number
  ) => Promise<void>
}
