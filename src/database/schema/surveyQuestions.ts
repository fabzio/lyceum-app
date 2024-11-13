import { uuid, varchar, foreignKey, jsonb } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { surveyQuestionType } from './enums'
import { surveys } from './surveys'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const surveyQuestions = schema.table(
  'survey_questions',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    type: surveyQuestionType('type').notNull(),
    questionText: varchar('question_text').notNull(),
    surveyId: uuid('survey_id').notNull(),
    options: jsonb('options'),
  },
  (table) => ({
    surveyFk: foreignKey({
      columns: [table.surveyId],
      foreignColumns: [surveys.id],
      name: 'survey_questions_survey_fk',
    }),
  })
)

export const surveyQuestionsRelations = relations(
  surveyQuestions,
  ({ one }) => ({
    survey: one(surveys, {
      fields: [surveyQuestions.surveyId],
      references: [surveys.id],
    }),
  })
)

export const surveyQuestionsSchema = createInsertSchema(surveyQuestions)
export type SurveyQuestionsSchema = z.infer<typeof surveyQuestionsSchema>
