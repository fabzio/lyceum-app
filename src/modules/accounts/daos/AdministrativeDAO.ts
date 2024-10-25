import { PaginatedData } from "@/interfaces/PaginatedData"

interface AdministrativeDAO {
  getAdministrativeDetail(params: { code: string }): Promise<{
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    email: string
    state: 'active' | 'inactive' | 'deleted'
    unit: string
  }>

  getAllAdministratives(filters: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }): Promise<PaginatedData<{
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    email: string
    state: 'active' | 'inactive' | 'deleted'
    speciallity: string
  }>>
}

export default AdministrativeDAO
