import { SecurityPermissionsDict } from './Security'
import { UserPermissionsDict } from './Users'

export type PermissionCode =
  | keyof typeof SecurityPermissionsDict
  | UserPermissionsDict
