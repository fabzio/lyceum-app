import { Account } from '@frontend/interfaces/models/Account'

export interface Thesis {
  id?: string
  title: string
  areaId: number
  applicantCode: string
  type?: 'individual' | 'group'
  students: Account['code'][]
  aprovalDate?: string
  advisors: Account['code'][]
}
