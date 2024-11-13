import { uuid, varchar, integer, foreignKey, serial } from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { terms } from '@/database/schema'
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
    answerRawText: varchar('answer_raw_text'),
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
}))

export const surveyAnswersSchema = createInsertSchema(surveyAnswers)
export type SurveyAnswersSchema = z.infer<typeof surveyAnswersSchema>
