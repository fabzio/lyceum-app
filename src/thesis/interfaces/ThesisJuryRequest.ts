interface Applicant {
  name: string
  firstSurname: string
  secondSurname: string
}

interface ThesisJuryRequest {
  code: string
  title: string
  date: Date
  aplicant: Applicant
  juryState: 'requested' | 'assigned' | 'unassigned'
}

export default ThesisJuryRequest
