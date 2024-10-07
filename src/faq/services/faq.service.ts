import http from '@/lib/http'
import { FAQ } from '../interfaces/FAQ'

class FAQService {
  public static async getFAQs(): Promise<FAQ[]> {
    try {
      const res = await http.get('/faq/faqs')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as FAQ[]
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public static async createFAQ(faq: Omit<FAQ, 'id'>): Promise<void> {
    try {
      const res = await http.post(`/faq/faqs`, faq)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }
  public static async updateFAQ(faq: FAQ): Promise<void> {
    console.log(faq)
    try {
      const res = await http.put('/faq/faqs', {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.faqCategoryId,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default FAQService
