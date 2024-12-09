import { foreignKey, integer, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { schema } from '../pgSchema'
import {
  specialityStudyPlans,
  studyPlanCourses,
  terms,
} from '@/database/schema'

export const studyPlans = schema.table(
  'study_plans',
  {
    id: serial('id').primaryKey(),
    initTerm: integer('init_term'),
    endTerm: integer('end_term'),
    startLevel: integer('start_level').notNull(),
    levelsCount: integer('levels_count').notNull(),
    description: varchar('description', { length: 100 }),
  },
  (table) => {
    return {
      studyPlansTermsFk: foreignKey({
        columns: [table.initTerm],
        foreignColumns: [terms.id],
        name: 'study_plans_terms_fk',
      }).onDelete('cascade'),
      studyPlansTermsFk1: foreignKey({
        columns: [table.endTerm],
        foreignColumns: [terms.id],
        name: 'study_plans_terms_fk_1',
      }).onDelete('cascade'),
    }
  }
)

export const studyPlansRelations = relations(studyPlans, ({ one, many }) => ({
  term_initTerm: one(terms, {
    fields: [studyPlans.initTerm],
    references: [terms.id],
    relationName: 'studyPlans_initTerm_terms_id',
  }),
  term_endTerm: one(terms, {
    fields: [studyPlans.endTerm],
    references: [terms.id],
    relationName: 'studyPlans_endTerm_terms_id',
  }),
  specialityStudyPlans: many(specialityStudyPlans),
  studyPlanCourses: many(studyPlanCourses),
}))

export const studyPlansSchema = createInsertSchema(studyPlans)
export type StudyPlansSchema = z.infer<typeof studyPlansSchema>
