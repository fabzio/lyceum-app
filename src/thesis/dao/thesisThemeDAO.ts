export interface ThesisThemeDAO {
  getThesisThemeRequest(): Promise<
    {
      code: string
      title: string
      date: Date
      lastAction: {
        id: number
        action: string
        role: string
      }
      applicant: {
        name: string
        code: string
      }
    }[]
  >

  getThesisThemeRequestDetail(params: { requestCode: string }): Promise<
    {
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
    }[]
  >

  getThesisThemeRequestActions(params: { requestCode: string }): Promise<
    {
      id: number
      action: string
      date: Date
      content: string
      isFile: boolean
      actor: string
      role: string
    }[]
  >
}
