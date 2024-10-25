import { Account } from '@/interfaces/models/Account'
import http from '@/lib/http'
import axios from 'axios'

class AccountsService {
  public static async getAccount({ q }: { q: string }) {
    try {
      const res = await http.get('/accounts/generic', {
        params: { q },
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
