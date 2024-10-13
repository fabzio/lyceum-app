import { ValidRoutes } from '@/constants/paths'
import { Permission } from './Permission'

export interface Module {
  id: number
  name: string
  description: string
  path: ValidRoutes
  permissions: Permission[]
}
