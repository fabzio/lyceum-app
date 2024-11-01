import { Account } from "@/interfaces/models/Account"
import { PaginatedData } from "@/interfaces/PaginatedData"

export interface StudentDAO {
  getStudentDetail(params: { code: string }): Promise<{
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    email: string
    state: 'active' | 'inactive' | 'deleted'
    speciallity: string
  }>
  createStudent: (
    studentList: { code: string; name: string; firstSurname: string; secondSurname: string ; email: string}[]
  ) => Promise<void>
  getAllStudents(filters: {
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
    // FIXME: Estaria listando solo los estudiantes activos, deberia listar todos? Tal vez para la vista del admin?
    // state: 'active' | 'inactive' | 'deleted'
    // speciallity: string
  }>>
}
