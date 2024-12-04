import { UnitType } from '../enums/UnitType'

export type Unit = {
  id: number
  name: string
  unitType: UnitType
  active: boolean
}
