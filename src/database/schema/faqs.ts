import { foreignKey, serial, varchar } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { faqCategories } from './faqCategories'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { units } from './units'

export const faqs = schema.table(
  'faqs',
  {
    id: serial('id').primaryKey(),
    question: varchar('question', { length: 255 }).notNull(),
    answer: varchar('answer', { length: 255 }).notNull(),
    faqCategoryId: serial('faq_category_id').notNull(),
    specialityId: serial('speciality_id').notNull(),
  },
  (table) => {
    return {
      faqsFaqCategoryFk: foreignKey({
        columns: [table.faqCategoryId],
        foreignColumns: [faqCategories.id],
        name: 'faq_faq_categories_fk',
      }).onDelete('cascade'),

      faqsSpecialityFk: foreignKey({
        columns: [table.specialityId],
        foreignColumns: [units.id],
        name: 'faq_speciality_fk',
      }).onDelete('cascade'),
    }
  }
)

export const faqsRelations = relations(faqs, ({ one }) => ({
  faqCategory: one(faqCategories, {
    fields: [faqs.faqCategoryId],
    references: [faqCategories.id],
  }),
  speciality: one(units, {
    fields: [faqs.specialityId],
    references: [units.id],
  }),
}))

export const faqsSchema = createInsertSchema(faqs)
export type FaqsSchema = z.infer<typeof faqsSchema>
