import { UnitType } from '../enums'

export type Course = {
  id: number
  code: string
  name: string
  credits: number
  unitId?: number
  unitType?: UnitType
  unitName?: string
}
