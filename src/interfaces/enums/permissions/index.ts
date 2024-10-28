import { SecurityPermissionsDict } from './Security'
import { ThesisPermissionsDict } from './Thesis'
import { UserPermissionsDict } from './Users'

export type PermissionCode =
  | SecurityPermissionsDict
  | UserPermissionsDict
  | ThesisPermissionsDict
