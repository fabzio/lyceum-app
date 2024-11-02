import { ValidRoutes } from '@frontend/constants/paths'
import { ModulesDict } from './enums/modules'
import { PermissionCode } from './enums/permissions'

export type AppModule = {
  code: ModulesDict
  label: string
  description: string
  path: ValidRoutes
  icon: JSX.Element
  submodules: {
    path: ValidRoutes
    label: string
    permissions: PermissionCode[]
  }[]
}
