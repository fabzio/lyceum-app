export interface JobApplication {
  id: number
  accountId: string
  requirementUrl: string
  motivation: string
  state: 'sent' | 'rejected' | 'to_evaluate' | 'evaluated' | 'selected'
  observation: string
  courseHiringId: string
}
