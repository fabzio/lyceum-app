import { boolean, char, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '../pgSchema'
import { studyPlans } from '@/database/schema'

export const terms = schema.table('terms', {
  id: serial('id').primaryKey(),
  name: char('name', { length: 6 }).notNull(),
  current: boolean('current').notNull().default(true),
})

export const termsRelations = relations(terms, ({ many }) => ({
  studyPlan_initTerm: many(studyPlans, {
    relationName: 'studyPlans_initTerm_terms_id',
  }),
  studyPlan_endTerm: many(studyPlans, {
    relationName: 'studyPlans_endTerm_terms_id',
  }),
}))

export const termsSchema = createInsertSchema(terms)
export type TermsSchema = z.infer<typeof termsSchema>
