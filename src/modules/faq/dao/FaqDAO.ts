import { FaqsSchema } from '@/database/schema/faqs'
import { FAQ } from '@/interfaces/models/FAQ'

export interface FaqDAO {
  getFAQs(): Promise<FAQ[]>
  createFAQ(data: FaqsSchema): Promise<void>
  updateFAQ(id: number, data: FaqsSchema): Promise<void>
  deleteFAQ(id: number): Promise<void>
}
