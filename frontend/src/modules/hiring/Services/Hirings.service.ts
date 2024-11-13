import { Hiring } from '@frontend/interfaces/models/Hiring'
import http from '@frontend/lib/http'
import axios from 'axios'
import { CreateTeacherSelectionForm } from '../views/TeacherSelection/NewTeacherSelection/components/TeacherSelectionForm'

const USE_MOCK = true // Cambia a false para usar la solicitud real

class HiringService {
  public static async createTeacherSelection(data: CreateTeacherSelectionForm) {
    try {
      const res = await http.post('/hiring-selection', data)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
  public static async getHirings(): Promise<Hiring[]> {
    if (USE_MOCK) {
      // Datos en duro simulados
      return mockData
    }

    // Lógica original (cuando el backend esté disponible)
    try {
      const res = await http.get('/hiring-selection')
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Hiring[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default HiringService

const mockData: Hiring[] = [
  {
    id: '1',
    name: 'Proceso de contratación para Docente de Matemáticas',
    status: 'activo',
    endDate: '2024-12-31',
    courses: [
      {
        id: 101,
        code: 'MAT101',
        name: 'Álgebra Lineal',
        credits: 4,
        unitId: 1,
        unitType: 'department', // Suponiendo que UnitType sea una enumeración con valores como este
        unitName: 'Departamento de Matemáticas',
      },
      {
        id: 102,
        code: 'MAT102',
        name: 'Cálculo Diferencial',
        credits: 4,
        unitId: 1,
        unitType: 'department',
        unitName: 'Departamento de Matemáticas',
      },
    ],
  },
  {
    id: '2',
    name: 'Proceso de contratación para Docente de Física',
    status: 'finalizado',
    endDate: '2023-11-30',
    courses: [
      {
        id: 201,
        code: 'PHY101',
        name: 'Física General',
        credits: 3,
        unitId: 2,
        unitType: 'faculty',
        unitName: 'Facultad de Ciencias',
      },
    ],
  },
  {
    id: '3',
    name: 'Proceso de contratación para Docente de Historia',
    status: 'en revisión',
    endDate: '2024-06-15',
    courses: [
      {
        id: 301,
        code: 'HIS101',
        name: 'Historia Antigua',
        credits: 3,
        unitId: 3,
        unitType: 'department',
        unitName: 'Departamento de Humanidades',
      },
      {
        id: 302,
        code: 'HIS102',
        name: 'Historia Moderna',
        credits: 3,
        unitId: 3,
        unitType: 'department',
        unitName: 'Departamento de Humanidades',
      },
    ],
  },
]
