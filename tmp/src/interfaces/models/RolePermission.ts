import { Permission } from './Permission'
import { Role } from './Role'

export interface RolePermission {
  permission: Permission
  role: Role
}
