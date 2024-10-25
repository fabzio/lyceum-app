import { PaginatedData } from "@/interfaces/PaginatedData"

export interface ExternalDAO {
  getAllExternals(filters: {
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

