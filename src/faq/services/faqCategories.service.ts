import { FaqCategory } from '@/interfaces/models/FAQCategories'
import { FaqCategoriesDAO } from '../dao/FaqCategoriesDAO'
import db from '@/database'
import { faqCategories } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { FaqCategoriesSchema } from '@/database/schema/faqCategories'

class FAQCategoriesService implements FaqCategoriesDAO {
  async createFaqCategory(faqCategory: FaqCategoriesSchema): Promise<void> {
    await db.insert(faqCategories).values(faqCategory)
  }
  async deleteFaqCategory(id: number): Promise<void> {
    await db.delete(faqCategories).where(eq(faqCategories.id, id))
  }
  async getFaqCategories(): Promise<FaqCategory[]> {
    const faqCategoriesResponse = (await db
      .select()
      .from(faqCategories)) as FaqCategory[]
    return faqCategoriesResponse
  }
  async updateFaqCategory(faqCategory: FaqCategory): Promise<FaqCategory> {
    await db
      .update(faqCategories)
      .set(faqCategory)
      .where(eq(faqCategories.id, faqCategory.id))
    return faqCategory
  }
}

export default FAQCategoriesService
