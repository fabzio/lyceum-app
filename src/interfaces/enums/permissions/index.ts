import { EnrollmentPermissionsDict } from './Enrollment'
import { SecurityPermissionsDict } from './Security'
import { StudentProcessPermissionsDict } from './StudentProcess'
import { StudyPlanPermissions } from './StudyPlan'
import { ThesisPermissionsDict } from './Thesis'
import { UserPermissionsDict } from './Users'

export type PermissionCode =
  | SecurityPermissionsDict
  | UserPermissionsDict
  | ThesisPermissionsDict
  | StudyPlanPermissions
  | StudentProcessPermissionsDict
  | EnrollmentPermissionsDict
