import { Assigment } from '@/interfaces/models'
import { Unit } from '@/interfaces/models/Unit'
import http from '@/lib/http'
import axios from 'axios'

class RoleAccountsService {
  public static async getRoleAccounts(): Promise<Assigment[]> {
    try {
      const res = await http.get('security/role-accounts')
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Assigment[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async insertRoleAccount(data: {
    accountId: string
    roleId: number
    unitId: number
  }) {
    try {
      const res = await http.post('security/role-accounts', data)
      const response = res.data as ResponseAPI

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

  public static async getUnitScopes(unitType: Unit['unitType']) {
    try {
      const res = await http.get('security/role-accounts/unit-scope', {
        params: { unitType },
      })
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data as Unit[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default RoleAccountsService
