import http from '@/lib/http'
import { FAQCategory } from '../interfaces/FAQCategory'
import axios from 'axios'

class FAQCategoryService {
  public static async getFAQCategories(): Promise<FAQCategory[]> {
    try {
      const res = await http.get(`/faq/faq-categories`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as FAQCategory[]
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message || err.message)
      }
      throw err
    }
  }

  public static async updateFAQCategory(category: FAQCategory): Promise<void> {
    try {
      const res = await http.put('/faq/faq-categories', category)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message || err.message)
      }
      throw err
    }
  }

  public static async deleteFAQCategory(
    FAQCategoryId: FAQCategory['id']
  ): Promise<void> {
    try {
      const res = await http.delete(`/faq/faq-categories/${FAQCategoryId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message || err.message)
      }
      throw err
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
        throw new Error(response.message)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message || err.message)
      }
      throw err
    }
  }
}

export default FAQCategoryService
