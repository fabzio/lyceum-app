import { PermissionCode } from '../enums/permissions'
import { Module } from './Module'

export interface Permission {
  id: number
  description: string
  name: PermissionCode
  moduleName: Module['name']
}
