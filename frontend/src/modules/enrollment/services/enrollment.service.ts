import http from '@frontend/lib/http'
import { EnrollmentGeneral } from '../interfaces/EnrollmentGeneral'
import EnrollmentProposal from '../interfaces/EnrollmentProposalDetail'
import { EnrollmentModification } from '../interfaces/EnrollmentModification'
import axios from 'axios'
import { Filters } from '@frontend/interfaces/types'
import { Account } from '@frontend/interfaces/models/Account'
import { Unit } from '@frontend/interfaces/models/Unit'

class EnrollmentService {
  public static async getStudentEnrollments({
    studentId,
    filters,
  }: {
    studentId: Account['id']
    filters: Filters
  }): Promise<PaginatedData<EnrollmentGeneral>> {
    try {
      const res = await http.get(
        `/enrollment/modifications/student/${studentId}`,
        {
          params: {
            q: filters.q || '',
            page: filters.pageIndex || 0,
            limit: filters.pageSize || 5,
            sortBy: filters.sortBy || 'requestNumber.asc',
            eqnumber: filters.eqnumber || undefined,
          },
        }
      )
      const response = res.data as ResponseAPI<PaginatedData<EnrollmentGeneral>>
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async createEnrollmentModification(
    enrollment: Omit<EnrollmentModification, 'state'>
  ): Promise<void> {
    try {
      // Realizamos la petición POST al endpoint /enrollment
      const res = await http.post('/enrollment/modifications', enrollment)
      const response = res.data as ResponseAPI

      // Verificamos si la respuesta indica éxito
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      // Manejo de errores de Axios
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error // Re-lanzamos el error si no es de Axios
    }
  }

  public static async getAllEnrollmentsOfSpeciality({
    filtersAndPagination,
    specialityId,
  }: {
    specialityId: Unit['id']
    filtersAndPagination: Filters
  }): Promise<PaginatedData<EnrollmentGeneral>> {
    try {
      const res = await http.get('/enrollment/modifications/paginated', {
        params: {
          specialityId,
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'requestNumber.asc',
          eqnumber: filtersAndPagination.eqnumber || undefined,
        },
      })
      const response = res.data as ResponseAPI<PaginatedData<EnrollmentGeneral>>
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getEnrollment({
    requestId,
  }: {
    requestId: EnrollmentGeneral['requestNumber']
  }): Promise<EnrollmentGeneral> {
    try {
      const res = await http.get(`/enrollment/modifications/${requestId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as EnrollmentGeneral
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get enrollment request data')
    }
  }

  public static async updateEnrollment({
    requestNumber,
    state,
    observation,
  }: Pick<EnrollmentGeneral, 'state' | 'requestNumber' | 'observation'>) {
    try {
      const res = await http.put(`/enrollment/modifications/${requestNumber}`, {
        state,
        observation,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as EnrollmentGeneral
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update enrollment request data')
    }
  }

  public static async getEnrollmentProposals({
    facultyId,
    filters,
  }: {
    facultyId: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: any
  }): Promise<PaginatedData<EnrollmentProposal>> {
    try {
      // const res = await http.get(`/enrollment/scheduleProposal/${facultyId}`)

      //TODO: Borrar las tres lineas de abajo porque son para que no bote error
      let a = facultyId
      facultyId = a
      a = filters

      const res = {
        data: {
          data: {
            result: [
              {
                courseId: 101,
                courseName: 'Advanced Business Studies',
                schedules: [
                  {
                    code: 'BUS101-M1',
                    courseId: 'BUS101',
                    courseName: 'Business Management I',
                    vacants: 25,
                    visibility: 'visible',
                  },
                  {
                    code: 'FIN202-A1',
                    courseId: 'FIN202',
                    courseName: 'Financial Analysis II',
                    vacants: 30,
                    visibility: 'visible',
                  },
                  {
                    code: 'MKT303-E1',
                    courseId: 'MKT303',
                    courseName: 'Marketing Strategies',
                    vacants: 20,
                    visibility: 'visible',
                  },
                ],
              },
            ],
            rowCount: 50,
            currentPage: 1,
            totalPages: 1,
            hasNext: false,
          },
          message: 'Mock data',
          success: true,
        } as ResponseAPI<PaginatedData<EnrollmentProposal>>,
      }

      const response = res.data
      // if (!response.success) {
      //   throw new Error('Error')
      // }
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get enrollment request data')
    }
  }
}

export default EnrollmentService
