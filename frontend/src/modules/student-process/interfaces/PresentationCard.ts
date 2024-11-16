import { Account } from '@frontend/interfaces/models/Account'

export interface PresentationCard {
  id: string
  companyName: string
  scheduleId: string
  accountIds: Account['code'][]
  detail: string
  createdAt: string
  scheduleCode?: string
  courseCode?: string
  courseName?: string
  accounts?: Account[]
  file?: File
  status: 'sent' | 'accepted' | 'rejected' | 'succeeded'
}
