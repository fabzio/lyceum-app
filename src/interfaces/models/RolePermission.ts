import { Permission } from './Permission'
import { Role } from './Role'

export interface RolePermission {
  role: Role
  permission: Permission
}

export interface RolePermissionDTO {
  role: Role
  permission: Permission[]
}
