import { UnitType } from '../enums'

export interface Hiring {
  id: string
  name: string
  status: string
  endDate: string
  courses: {
    id: number
    processId: string
    code: string
    name: string
    credits: number
    unitId?: number
    unitType?: UnitType
    unitName?: string
  }[]
}
