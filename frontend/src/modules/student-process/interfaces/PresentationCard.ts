import { Account } from '@frontend/interfaces/models/Account'

export interface PresentationCard {
  id: string
  companyName: string
  scheduleId: string
  accountIds: Account['code'][]
  description: string
  createdAt: string
  scheduleCode?: string
  courseCode?: string
  courseName?: string
  accounts?: Account[]
  file?: File
  status: 'pending' | 'approved' | 'rejected'
}
