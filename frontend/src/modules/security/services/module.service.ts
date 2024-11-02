import { Module } from '@frontend/interfaces/models'
import http from '@frontend/lib/http'

class ModuleService {
  public static async getModules() {
    try {
      const res = await http.get(`/security/modules`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as Module[]
    } catch (err) {
      console.error(err)
      return []
    }
  }
}

export default ModuleService
