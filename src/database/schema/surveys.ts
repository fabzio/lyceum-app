import {
  boolean,
  date,
  uuid,
  varchar,
  integer,
  foreignKey,
  serial,
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '../pgSchema'
import { accounts, surveyQuestions, units } from '@/database/schema'
import { surveyType } from './enums'
import { relations } from 'drizzle-orm'

export const surveys = schema.table(
  'surveys',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull(),
    creatorId: uuid('creator_id').notNull(),
    unitId: integer('unit_id').notNull(),
    creationDate: date('creation_date', { mode: 'date' }).defaultNow(),
    endDate: date('end_date', { mode: 'date' }).notNull(),
    surveyType: surveyType('survey_type').notNull(),
    active: boolean('active').default(true).notNull(),
  },
  (table) => ({
    creatorFk: foreignKey({
      columns: [table.creatorId],
      foreignColumns: [accounts.id],
      name: 'survey_creator_fk',
    }),
    unitFk: foreignKey({
      columns: [table.unitId],
      foreignColumns: [units.id],
      name: 'survey_unit_fk',
    }),
  })
)

export const surveyRelations = relations(surveys, ({ one, many }) => ({
  creator: one(accounts, {
    fields: [surveys.creatorId],
    references: [accounts.id],
  }),
  unit: one(units, {
    fields: [surveys.unitId],
    references: [units.id],
  }),
  quuestions: many(surveyQuestions),
}))

export const surveySchema = createInsertSchema(surveys)
export type SurveySchema = z.infer<typeof surveySchema>
