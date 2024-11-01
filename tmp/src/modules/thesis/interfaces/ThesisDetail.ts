export interface ThesisDetail {
  code: string
  title: string
  date: Date
  area: string
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
}
