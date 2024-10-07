
import http from '@/lib/http'
import { FAQCategory } from '../interfaces/FAQCategory'

class FAQCategoryService {
  public static async getFAQCategories(): Promise<FAQCategory[]> {
    
    try {
      const res = await http.get(`/faq/faq-categories`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as FAQCategory[]
    } catch (err) {
      console.error(err as Error)
      return []
    }
  }

  public static async updateFAQCategory(category: FAQCategory): Promise<void> {
    try {
      const res = await http.put('/faq/faq-categories', category)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (err) {
      console.error(err)
    }
  }

  public static async deleteFAQCategory(
    FAQCategoryId: FAQCategory['id']
  ): Promise<void> {
    try {
      const res = await http.delete(`/faq/faq-categories/${FAQCategoryId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (err) {
      console.error(err)
    }
  }

  public static async createFAQCategory(
    FAQCategoryName: FAQCategory['name']
  ): Promise<void> {
    try {
      const res = await http.post(`/faq/faq-categories`, {
        name: FAQCategoryName,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export default FAQCategoryService
