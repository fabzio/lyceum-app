export interface ThesisThemeRequest {
  code: string
  title: string
  date: string
  lastAction: {
    id: number
    accountId: string
    action: string
    role: string
  }
  applicant: {
    name: string
    code: string
  }
}
