import { ValidRoutes } from '@/constants/paths'
import { ModulesDict } from '@/interfaces/enums/modules'
import { StudyPlanModule } from '@/modules/study-plans/study-plan.module'
import { useSessionStore } from '@/store'
import {
  Building2,
  Home,
  MessageCircleQuestion,
} from 'lucide-react'
import AsideDesktop from './AsideDesktop'
import { ThesisModule } from '@/modules/thesis/thesis.module'
import { PermissionCode } from '@/interfaces/enums/permissions'
import { SecurityModule } from '@/modules/security/security.module'
import { UserModule } from '@/modules/users/users.module'
import { CoursesModule } from '@/modules/courses/courses.module'
import { EnrollmentModule } from '@/modules/enrollment/enrollment.module'

export default function Aside() {
  const { getAllowedModules } = useSessionStore()
  const allowedModules = getAllowedModules()

  const filteredAsideElements = asideElements.filter(
    (element) =>
      allowedModules.includes(element.moduleCode) ||
      element.moduleCode === ModulesDict.HOME
  )
  return <AsideDesktop asideElements={filteredAsideElements} />
}

export type AsideElement = {
  icon: JSX.Element
  path: ValidRoutes
  params?: Record<string, string>
  label: string
  moduleCode: ModulesDict
  submodules: {
    path: ValidRoutes
    label: string
    permissions: PermissionCode[]
  }[]
}
const asideElements: AsideElement[] = [
  {
    icon: <Home />,
    path: '/',
    label: 'Inicio',
    moduleCode: ModulesDict.HOME,
    submodules: [],
  },
  {
    icon: SecurityModule.icon,
    path: SecurityModule.path,
    label: SecurityModule.label,
    moduleCode: SecurityModule.code,
    submodules: SecurityModule.submodules,
  },
  {
    icon: UserModule.icon,
    path: UserModule.path,
    label: UserModule.label,
    moduleCode: UserModule.code,
    submodules: UserModule.submodules,
  },
  {
    icon: <Building2 />,
    path: '/unidad/$name',
    label: 'Unidad',
    moduleCode: ModulesDict.UNITS,
    submodules: [],
  },
  {
    icon: <MessageCircleQuestion />,
    path: '/preguntas-frecuentes',
    label: 'Preguntas frecuentes',
    moduleCode: ModulesDict.FAQ,
    submodules: [],
  },
  {
    icon: CoursesModule.icon,
    path: CoursesModule.path,
    label: CoursesModule.label,
    moduleCode: CoursesModule.code,
    submodules: CoursesModule.submodules,
  },
  {
    icon: ThesisModule.icon,
    path: ThesisModule.path,
    label: ThesisModule.label,
    moduleCode: ThesisModule.code,
    submodules: ThesisModule.submodules,
  },
  {
    icon: EnrollmentModule.icon,
    path: EnrollmentModule.path,
    label: EnrollmentModule.label,
    moduleCode: EnrollmentModule.code,
    submodules: EnrollmentModule.submodules,
  },
  {
    icon: StudyPlanModule.icon!,
    path: StudyPlanModule.path,
    label: StudyPlanModule.label,
    moduleCode: StudyPlanModule.code,
    submodules: StudyPlanModule.submodules,
  },
]
