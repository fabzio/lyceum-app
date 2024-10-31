export interface getRiskStudentDetail {
  student: {
    code: string
    name: string
    email: string
    surname: string
  }
  course: {
    code: string
    name: string
  }
  schedule: {
    id: number
    code: string
    professorName: string
    professorSurname: string
    professorEmail: string
    professorCode: string
  }
  score: number | null
  reason: string
  state: boolean
}
