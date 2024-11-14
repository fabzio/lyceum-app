import { uuid, varchar, integer, foreignKey, serial } from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { accounts, schedules, terms } from '@/database/schema'
import { surveyQuestions } from './surveyQuestions'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const surveyAnswers = schema.table(
  'survey_answers',
  {
    id: serial('id').primaryKey().notNull(),
    questionId: integer('question_id').notNull(),
    subjectAccountId: uuid('subject_account_id').notNull(),
    scheduleId: integer('schedule_id').notNull(),
    answerRawText: varchar('answer_raw_text').notNull(),
  },
  (table) => ({
    questionFk: foreignKey({
      columns: [table.questionId],
      foreignColumns: [surveyQuestions.id],
      name: 'survey_answers_question_fk',
    }),
  })
)

export const surveyAnswersRelations = relations(surveyAnswers, ({ one }) => ({
  question: one(surveyQuestions, {
    fields: [surveyAnswers.questionId],
    references: [surveyQuestions.id],
  }),
  schedule: one(schedules, {
    fields: [surveyAnswers.scheduleId],
    references: [schedules.id],
  }),
  account: one(accounts, {
    fields: [surveyAnswers.subjectAccountId],
    references: [accounts.id],
  }),
}))

export const surveyAnswersSchema = createInsertSchema(surveyAnswers)
export type SurveyAnswersSchema = z.infer<typeof surveyAnswersSchema>
