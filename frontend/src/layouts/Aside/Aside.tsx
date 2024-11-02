import { ValidRoutes } from '@frontend/constants/paths'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { useSessionStore } from '@frontend/store'
import AsideDesktop from './AsideDesktop'
import { PermissionCode } from '@frontend/interfaces/enums/permissions'
import Modules from '@frontend/modules'
import { Home } from 'lucide-react'

export default function Aside() {
  const { getAllowedModules } = useSessionStore()
  const allowedModules = getAllowedModules()

  const filteredAsideElements = asideElements.filter(
    (element) =>
      allowedModules.includes(element.code) || element.code === ModulesDict.HOME
  )
  return <AsideDesktop asideElements={filteredAsideElements} />
}

export type AsideElement = {
  icon: JSX.Element
  path: ValidRoutes
  params?: Record<string, string>
  label: string
  code: ModulesDict
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
    code: ModulesDict.HOME,
    submodules: [],
  },
  ...Modules.map((module) => ({
    icon: module.icon,
    path: module.path,
    label: module.label,
    code: module.code,
    submodules: module.submodules,
  })),
]
