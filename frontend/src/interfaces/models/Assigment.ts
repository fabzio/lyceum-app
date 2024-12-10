export interface Assigment {
  id: string
  name: string
  code: string
  roles: {
    id: number
    name: string
    unitId: number
    unitName: string
    editable: boolean
  }[]
}
