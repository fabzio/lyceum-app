import http from '@frontend/lib/http'
import { FAQ } from '../interfaces/FAQ'
import axios from 'axios'
import { Unit } from '@frontend/interfaces/models/Unit'

class FAQService {
  public static async getFAQs(params: { unitId: Unit['id'] }): Promise<FAQ[]> {
    try {
      const res = await http.get('/faq/faqs', { params })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as FAQ[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async createFAQ(faq: Omit<FAQ, 'id'>): Promise<void> {
    try {
      const res = await http.post(`/faq/faqs`, {
        ...faq,
        category: faq.faqCategoryId,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
  public static async updateFAQ(faq: Omit<FAQ, 'specialityId'>): Promise<void> {
    try {
      const res = await http.put('/faq/faqs', {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.faqCategoryId,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async deleteFAQ(faqId: FAQ['id']): Promise<void> {
    try {
      const res = await http.delete(`/faq/faqs/${faqId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default FAQService
