import { PresentationCard } from './PresentationCard'

export interface PresentationCardRequest {
  presentationCard: PresentationCard
  status: 'pending' | 'approved' | 'rejected'
  step: 1 | 2 | 3 | 4
  lastAction: {
    id: number
    account: string
    action: 'denied' | 'approved' | 'sended'
    role: string
  }
}
