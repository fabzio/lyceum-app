import { PaginatedData } from '@/interfaces/PaginatedData'

export interface ProfessorDAO {
  getProfessorDetail(params: { code: string }): Promise<{
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    email: string
    state: 'active' | 'inactive' | 'deleted'
    unit: number
  }>
  getAllProfessors(filters: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }): Promise<
    PaginatedData<{
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
      state: 'active' | 'inactive' | 'deleted'
      unit: string
    }>
  >
  createProfessor: (
    professorList: {
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
      unitName: string
    }[]
  ) => Promise<void>
}
