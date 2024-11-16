import db from '@/database'
import { FaqDAO } from '../dao/FaqDAO'
import { FAQ } from '@/interfaces/models/FAQ'
import { faqCategories, faqs } from '@/database/schema'
import { FaqsSchema } from '@/database/schema/faqs'
import { eq } from 'drizzle-orm'
import { Unit } from '@/interfaces/models/Unit'

class FAQService implements FaqDAO {
  public async getFAQs(unitId: Unit['id']): Promise<FAQ[]> {
    const unitExist = await db.query.units.findFirst({
      columns: {
        id: true,
      },
      where: (units, { eq, and }) =>
        and(eq(units.id, unitId), eq(units.type, 'speciality')),
    })
    if (!unitExist) throw new Error('Especialidad no encontrada')
    return (await db
      .select({
        id: faqs.id,
        question: faqs.question,
        answer: faqs.answer,
        faqCategoryId: faqs.faqCategoryId,
        category: faqCategories.name,
      })
      .from(faqs)
      .innerJoin(faqCategories, eq(faqs.faqCategoryId, faqCategories.id))
      .where(eq(faqs.specialityId, unitId))) as FAQ[]
  }

  public async createFAQ(data: FaqsSchema): Promise<void> {
    await db.insert(faqs).values(data)
  }

  public async updateFAQ(id: number, data: FaqsSchema): Promise<void> {
    await db.update(faqs).set(data).where(eq(faqs.id, id))
  }

  public async deleteFAQ(id: number): Promise<void> {
    await db.delete(faqs).where(eq(faqs.id, id))
  }
}

export default FAQService
