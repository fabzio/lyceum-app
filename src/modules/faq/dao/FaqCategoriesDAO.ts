import { FaqCategoriesSchema } from '@/database/schema/faqCategories'
import { FaqCategory } from '@/interfaces/models/FAQCategories'

export interface FaqCategoriesDAO {
  getFaqCategories(): Promise<FaqCategory[]>
  createFaqCategory(faqCategory: FaqCategoriesSchema): Promise<void>
  updateFaqCategory(faqCategory: FaqCategoriesSchema): Promise<FaqCategory>
  deleteFaqCategory(id: number): Promise<void>
}
