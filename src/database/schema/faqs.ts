import { foreignKey, serial, varchar } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { faqCategories } from './faqCategories'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const faqs = schema.table(
  'faqs',
  {
    id: serial('id').primaryKey(),
    question: varchar('question', { length: 255 }).notNull(),
    answer: varchar('answer', { length: 255 }).notNull(),
    faqCategoryId: serial('faq_category_id').notNull(),
  },
  (table) => {
    return {
      faqsFaqCategoryFk: foreignKey({
        columns: [table.faqCategoryId],
        foreignColumns: [faqCategories.id],
        name: 'role_permissions_permissions_fk',
      }).onDelete('cascade'),
    }
  }
)

export const faqsRelations = relations(faqs, ({ one }) => ({
  faqCategory: one(faqCategories, {
    fields: [faqs.faqCategoryId],
    references: [faqCategories.id],
  }),
}))

export const faqsSchema = createInsertSchema(faqs)
export type FaqsSchema = z.infer<typeof faqsSchema>
