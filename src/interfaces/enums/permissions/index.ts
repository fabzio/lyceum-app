import { SecurityPermissionsDict } from './Security'
import { StudyPlanPermissions } from './StudyPlan'
import { ThesisPermissionsDict } from './Thesis'
import { UserPermissionsDict } from './Users'

export type PermissionCode =
  | SecurityPermissionsDict
  | UserPermissionsDict
  | ThesisPermissionsDict
  | StudyPlanPermissions
