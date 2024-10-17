import { ValidRoutes } from '@/constants/paths'

type AppModule = {
  code: string
  label: string
  description: string
  path: ValidRoutes
  icon?: JSX.Element
  children?: AppModule[]
}
