import { ValidRoutes } from '@/constants/paths'
import { ModulesDict } from './enums/modules'

type AppModule = {
  code: ModulesDict
  label: string
  description: string
  path: ValidRoutes
  icon?: JSX.Element
  children?: AppModule[]
}
