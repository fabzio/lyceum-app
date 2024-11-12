import {
  boolean,
  integer,
  uuid,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core'
import { schema } from '..'
import { accounts, schedules, terms } from '@/database/schema'
import { surveys } from './surveys'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const accountSurveys = schema.table(
  'account_surveys',
  {
    subjectAccountId: uuid('subject_account_id').notNull(),
    evaluatorAccountId: uuid('evaluator_account_id').notNull(),
    surveyId: uuid('survey_id').notNull(),
    scheduleId: integer('schedule_id'),
    termId: integer('term_id'),
    answered: boolean('answered').default(false),
  },
  (table) => ({
    pk: primaryKey({
      columns: [
        table.subjectAccountId,
        table.evaluatorAccountId,
        table.surveyId,
        table.scheduleId,
        table.termId,
      ],
      name: 'account_survey_pk',
    }),
    subjectAccountFk: foreignKey({
      columns: [table.subjectAccountId],
      foreignColumns: [accounts.id],
      name: 'account_survey_subject_fk',
    }),
    evaluatorAccountFk: foreignKey({
      columns: [table.evaluatorAccountId],
      foreignColumns: [accounts.id],
      name: 'account_survey_evaluator_fk',
    }),
    surveyFk: foreignKey({
      columns: [table.surveyId],
      foreignColumns: [surveys.id],
      name: 'account_survey_survey_fk',
    }),
    scheduleFk: foreignKey({
      columns: [table.scheduleId],
      foreignColumns: [schedules.id],
      name: 'account_survey_schedule_fk',
    }),
    termFk: foreignKey({
      columns: [table.termId],
      foreignColumns: [terms.id],
      name: 'account_survey_term_fk',
    }),
  })
)

export const accountSurveyRelations = relations(accountSurveys, ({ one }) => ({
  subjectAccount: one(accounts, {
    fields: [accountSurveys.subjectAccountId],
    references: [accounts.id],
  }),
  evaluatorAccount: one(accounts, {
    fields: [accountSurveys.evaluatorAccountId],
    references: [accounts.id],
  }),
  survey: one(surveys, {
    fields: [accountSurveys.surveyId],
    references: [surveys.id],
  }),
  schedule: one(schedules, {
    fields: [accountSurveys.scheduleId],
    references: [schedules.id],
  }),
  term: one(terms, { fields: [accountSurveys.termId], references: [terms.id] }),
}))

export const accountSurveySchema = createInsertSchema(accountSurveys)
export type AccountSurveySchema = z.infer<typeof accountSurveySchema>
