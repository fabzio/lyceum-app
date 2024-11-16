import { Account } from '@frontend/interfaces/models/Account'

export interface PresentationCard {
  id: number
  companyName: string
  submissionDate: string
  status: 'sent' | 'accepted' | 'rejected' | 'succeeded'
  scheduleId: number
  code: string
  name: string
  courseCode: string
}

export interface PresentationCardDetail {
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
