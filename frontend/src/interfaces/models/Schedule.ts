export interface Schedule {
  id: number
  code: string
  vacancies: number
  //TODO: agregar el atributo visibility en la respuesat del back
  visibility: boolean | undefined
  state: 'saved' | 'editing'
  professors: Professor[]
  jps: JP[]
}

export interface Professor {
  accountId: string
  code: string
  name: string
  isLead: boolean
}

export interface JP {
  accountId: string
  code: string
  name: string
  isLead: boolean | null
}
