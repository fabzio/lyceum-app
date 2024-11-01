import { ValidRoutes } from '@/constants/paths'
import { SecurityModule } from './security/security.module'
import { StudyPlanModule } from './study-plans/study-plan.module'
import { ThesisModule } from './thesis/thesis.module'
import { UserModule } from './users/users.module'
import { StudentProcessModule } from './student-process/student-process.module'
import { EnrollmentModule } from './enrollment/enrollment.module'

const Modules = [
  StudyPlanModule,
  StudentProcessModule,
  EnrollmentModule,
  SecurityModule,
  UserModule,
  ThesisModule,
]

export const getModuleByPath = (path: ValidRoutes) => {
  return Modules.find((module) => module.path === path)
}

export default Modules
