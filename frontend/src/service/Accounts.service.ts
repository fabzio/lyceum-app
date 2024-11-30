import { BaseRoles } from '@frontend/interfaces/enums/BaseRoles'
import { Account } from '@frontend/interfaces/models/Account'
import { AccountRoles } from '@frontend/interfaces/models/AccountRoles'
import { Filters } from '@frontend/interfaces/types'
import http from '@frontend/lib/http'
import axios from 'axios'

class AccountsService {
  public static async fetchAccountsBySchedule(
    filtersAndPagination: Filters,
    scheduleId: number // Agregamos el parámetro scheduleId
  ): Promise<PaginatedData<AccountRoles>> {
    try {
      const res = await http.get(`/accounts/generic/bySchedule`, {
        // Cambiamos la ruta según tu endpoint
        params: {
          q: filtersAndPagination.q || '',
          page: filtersAndPagination.pageIndex || 0,
          limit: filtersAndPagination.pageSize || 5,
          sortBy: filtersAndPagination.sortBy || 'name.asc',
          scheduleId: scheduleId,
        },
      })

      const response = res.data as ResponseAPI<PaginatedData<AccountRoles>>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async fetchAccountProfile(accountId: Account['id']) {
    try {
      const res = await http.get(`/accounts/generic/profile/${accountId}`)
      const response = res.data as ResponseAPI<{
        code: string
        roles: { role: string; unit: string; editable: boolean }[]
      }>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getAccount({
    q,
    userType,
  }: {
    q: string
    userType?: BaseRoles
  }): Promise<Account[]> {
    try {
      const res = await http.get('/accounts/generic', {
        params: { q, userType },
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Account[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message)
      }
      throw error
    }
  }
}
export default AccountsService
