import { uuid, varchar, integer, foreignKey } from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { terms } from '@/database/schema'
import { surveyQuestions } from './surveyQuestions'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const surveyAnswers = schema.table(
  'survey_answers',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    questionId: uuid('question_id').notNull(),
    answerRawText: varchar('answer_raw_text'),
    termId: integer('term_id').notNull(),
  },
  (table) => ({
    questionFk: foreignKey({
      columns: [table.questionId],
      foreignColumns: [surveyQuestions.id],
      name: 'survey_answers_question_fk',
    }),
    termFk: foreignKey({
      columns: [table.termId],
      foreignColumns: [terms.id],
      name: 'survey_answers_term_fk',
    }),
  })
)

export const surveyAnswersRelations = relations(surveyAnswers, ({ one }) => ({
  question: one(surveyQuestions, {
    fields: [surveyAnswers.questionId],
    references: [surveyQuestions.id],
  }),
  term: one(terms, {
    fields: [surveyAnswers.termId],
    references: [terms.id],
  }),
}))

export const surveyAnswersSchema = createInsertSchema(surveyAnswers)
export type SurveyAnswersSchema = z.infer<typeof surveyAnswersSchema>
