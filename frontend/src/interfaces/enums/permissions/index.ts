import { EnrollmentPermissionsDict } from './Enrollment'
import { FAQPermissionsDict } from './FAQ'
import { HiringPermissionsDict } from './Hiring'
import { SecurityPermissionsDict } from './Security'
import { StudentProcessPermissionsDict } from './StudentProcess'
import { StudyPlanPermissions } from './StudyPlan'
import { ThesisPermissionsDict } from './Thesis'
import { UserPermissionsDict } from './Users'
import { UnitPermissionsDict } from './Units'
import { SurveyPermissionsDict } from './Survey'
import { PresentationCardPermissionsDict } from './PresentationCard'

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
  | SurveyPermissionsDict
  | PresentationCardPermissionsDict
  | 'TODO_PERMISSION'
