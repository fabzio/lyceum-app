import { UnitType } from '../enums'

export type Unit = {
  id: number
  name: string
  unitType: UnitType
  description?: string
  parentName?: string
  parentId?: number
  active?: boolean
}
