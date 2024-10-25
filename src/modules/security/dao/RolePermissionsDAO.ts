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
}
