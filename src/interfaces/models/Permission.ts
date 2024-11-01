import { Module } from './Module'

export interface Permission {
  id: number
  description: string
  moduleName: Module['name']
}
