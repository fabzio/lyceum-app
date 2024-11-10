import { UnitType } from '../enums'

export type Unit = {
  id: number
  name: string
  unitType: UnitType
  parentName?: string
  parentId?: number
}
