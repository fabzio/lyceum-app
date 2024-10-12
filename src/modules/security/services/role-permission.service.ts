import { RolePermission } from '@/interfaces'
import http from '@/lib/http'

class RolePermissionService {
  public static async getRolePermissions() {
    try {
      const res = await http.get(`/security/role-permissions`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
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
        throw new Error('Error')
      }
      return response.data as RolePermission
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

export default RolePermissionService
