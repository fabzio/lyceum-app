export interface ThesisThemeDetail {
  code: string
  title: string
  date: string
  area: string
  juryState: 'unassigned' | 'requested' | 'assigned'
  applicant: {
    name: string
    code: string
  }
  students: {
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    principal: boolean
  }[]
  advisors: {
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    principal: boolean
  }[]

  lastAction: {
    id: number
    account: string
    action: 'denied' | 'approved' | 'sended'
    role: string
  }
}
