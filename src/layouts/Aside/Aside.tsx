import { ValidRoutes } from '@/constants/paths'
import { ModulesDict } from '@/interfaces/enums/modules'
import { StudyPlanModule } from '@/modules/study-plans/study-plan.module'
import { useSessionStore } from '@/store'
import {
  Book,
  Building2,
  CalendarRange,
  FileUser,
  Home,
  MessageCircleQuestion,
  ShieldCheck,
  Users,
} from 'lucide-react'
import AsideDesktop from './AsideDesktop'

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
}
const asideElements: AsideElement[] = [
  {
    icon: <Home />,
    path: '/',
    label: 'Inicio',
    moduleCode: ModulesDict.HOME,
  },
  {
    icon: <ShieldCheck />,
    path: '/seguridad',
    label: 'Seguridad',
    moduleCode: ModulesDict.SECURITY,
  },
  {
    icon: <Users />,
    path: '/usuarios',
    label: 'Gestión de Usuarios',
    moduleCode: ModulesDict.USERS,
  },
  {
    icon: <Building2 />,
    path: '/unidad/$name',
    label: 'Unidad',
    moduleCode: ModulesDict.UNITS,
  },
  {
    icon: <MessageCircleQuestion />,
    path: '/preguntas-frecuentes',
    label: 'Preguntas frecuentes',
    moduleCode: ModulesDict.FAQ,
  },
  {
    icon: <FileUser />,
    path: '/cursos',
    label: 'Procesos de estudiantes',
    moduleCode: ModulesDict.STUDY_PROCESS,
  },
  {
    icon: <Book />,
    path: '/tesis',
    label: 'Tesis',
    moduleCode: ModulesDict.THESIS,
  },
  {
    icon: <CalendarRange />,
    path: '/matricula',
    label: 'Solicitudes de Matricula',
    moduleCode: ModulesDict.ENROLLMENT,
  },
  {
    icon: StudyPlanModule.icon!,
    path: StudyPlanModule.path,
    label: StudyPlanModule.label,
    moduleCode: StudyPlanModule.code,
  },
]
