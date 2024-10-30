import { ValidRoutes } from '@/constants/paths'
import { SecurityModule } from './security/security.module'
import { StudyPlanModule } from './study-plans/study-plan.module'
import { ThesisModule } from './thesis/thesis.module'
import { UserModule } from './users/users.module'

export const Modules = [
  StudyPlanModule,
  SecurityModule,
  UserModule,
  ThesisModule,
]

export const getModuleByPath = (path: ValidRoutes) => {
  return Modules.find((module) => module.path === path)
}
