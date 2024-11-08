import { RolePermission, UnitType } from '@frontend/interfaces/models'
import http from '@frontend/lib/http'
import axios from 'axios'

class RolePermissionService {
  public static async getRole({ q = '' }: { q: string }) {
    try {
      const res = await http.get('/security/role-permissions/search', {
        params: { q },
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as {
        id: number
        name: string
        unitType: UnitType
      }[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message)
      }
      throw error
    }
  }
  public static async getRolePermissions() {
    try {
      const res = await http.get(`/security/role-permissions`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as RolePermission[]
    } catch (err) {
      console.error(err)
      return []
    }
  }

  public static async createRolePermission(rolePermission: {
    role: { name: string; unitType: string }
    permissions: number[]
  }) {
    try {
      const res = await http.post(`/security/role-permissions`, rolePermission)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as RolePermission
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data || err.message)
      }
      throw err
    }
  }

  public static async deleteRolePermission(rolePermissionId: number) {
    try {
      const res = await http.delete(
        `/security/role-permissions/${rolePermissionId}`
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as RolePermission
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data || err.message)
      }
      throw err
    }
  }
}

export default RolePermissionService
