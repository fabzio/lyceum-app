import { Module } from './Module'

export interface Permission {
  id: number
  description: string
  risk: number
  moduleName: Module['name']
}
