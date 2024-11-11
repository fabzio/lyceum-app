export interface EnrollmentProposal {
  id: number
  speciality: {
    id: number
    name: string
  }
  state: 'requested' | 'sended' | 'aproved' | 'assigned'
}
