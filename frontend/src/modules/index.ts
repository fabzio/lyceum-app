import { ValidRoutes } from '@frontend/constants/paths'
import { SecurityModule } from './security/security.module'
import { StudyPlanModule } from './study-plans/study-plan.module'
import { ThesisModule } from './thesis/thesis.module'
import { UserModule } from './users/users.module'
import { StudentProcessModule } from './student-process/student-process.module'
import { EnrollmentModule } from './enrollment/enrollment.module'
import { UnitModule } from './unit/unit.module'
import { HiringModule } from './hiring/hiring.module'
import { FAQModule } from './faq/faq.module'
import { SurveysModule } from './surveys/surveys.module'

const Modules = [
  StudyPlanModule,
  StudentProcessModule,
  EnrollmentModule,
  SecurityModule,
  UserModule,
  ThesisModule,
  FAQModule,
  UnitModule,
  HiringModule,
  SurveysModule,
]

export const getModuleByPath = (path: ValidRoutes) => {
  return Modules.find((module) => module.path === path)
}

export default Modules
