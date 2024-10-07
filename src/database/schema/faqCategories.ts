import { serial, unique, varchar } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { relations } from 'drizzle-orm'
import { faqs } from './faqs'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const faqCategories = schema.table(
  'faq_categories',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 60 }).notNull(),
  },
  (table) => {
    return {
      faqCategoriesUnique: unique('faq_categories_unique').on(table.name),
    }
  }
)

export const faqsRelations = relations(faqCategories, ({ many }) => ({
  faqs: many(faqs),
}))

export const faqCategoriesSchema = createInsertSchema(faqCategories)
export type FaqCategoriesSchema = z.infer<typeof faqCategoriesSchema>
