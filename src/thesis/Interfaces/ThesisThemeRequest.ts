import { Thesis } from './Thesis'

export interface ThesisThemeRequest {
  id: string
  thesis: Thesis
  requester?: string
  status: 'approved' | 'pending'
  submissionDate?: string
  aprovalDate?: string
  approvalHistory: {
    step: string
    updateDate?: string
    status: 'completed' | 'current' | 'pending'
    name: string
    canDownload?: boolean
  }[]
}
