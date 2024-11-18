import { FaqsSchema } from '@/database/schema/faqs'
import { FAQ } from '@/interfaces/models/FAQ'
import { Unit } from '@/interfaces/models/Unit'

export interface FaqDAO {
  getFAQs(unitId: Unit['id']): Promise<FAQ[]>
  createFAQ(data: FaqsSchema): Promise<void>
  updateFAQ(id: number, data: FaqsSchema): Promise<void>
  deleteFAQ(id: number): Promise<void>
}
