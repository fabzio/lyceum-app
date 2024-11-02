import { Permission } from '@frontend/interfaces/models'
import http from '@frontend/lib/http'

class PermissionService {
  public static async getPermissions(module?: number) {
    try {
      const res = await http.get(`/security/permissions`, {
        params: { module },
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as Permission[]
    } catch (err) {
      console.error(err)
      return []
    }
  }
}

export default PermissionService
