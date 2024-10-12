import { RolesSchema } from '@/database/schema/roles'
import { Permission } from '@/interfaces/models/Permission'
import { RolePermission } from '@/interfaces/models/RolePermission'

export interface RolePermissionDAO {
  getAllRolePermissions: () => Promise<RolePermission[]>
  insertRolePermission: (rolePermission: {
    role: RolesSchema
    permissions: Permission['id'][]
  }) => Promise<RolePermission>
}
