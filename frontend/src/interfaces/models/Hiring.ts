import { UnitType } from '../enums'

export interface Hiring {
  id: string
  description: string
  status: string
  startDate: string
  endDate: string
  endReceivingDate: string
  resultsPublicationDate: string
  courses: {
    id: number
    code: string
    name: string
    credits: number
    unitId?: number
    unitType?: UnitType
    unitName?: string
  }[]
}
