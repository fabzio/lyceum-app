import { EnrollmentPermissionsDict } from './Enrollment'
import { FAQPermissionsDict } from './FAQ'
import { HiringPermissionsDict } from './Hiring'
import { SecurityPermissionsDict } from './Security'
import { StudentProcessPermissionsDict } from './StudentProcess'
import { StudyPlanPermissions } from './StudyPlan'
import { ThesisPermissionsDict } from './Thesis'
import { UserPermissionsDict } from './Users'
import { UnitPermissionsDict } from './Units'

export type PermissionCode =
  | SecurityPermissionsDict
  | UserPermissionsDict
  | ThesisPermissionsDict
  | StudyPlanPermissions
  | StudentProcessPermissionsDict
  | EnrollmentPermissionsDict
  | HiringPermissionsDict
  | FAQPermissionsDict
  | UnitPermissionsDict
  | 'TODO_PERMISSION'
