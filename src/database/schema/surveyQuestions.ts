import { varchar, foreignKey, integer, serial } from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { surveyQuestionType } from './enums'
import { surveys } from './surveys'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const surveyQuestions = schema.table(
  'survey_questions',
  {
    id: serial('id').primaryKey().notNull(),
    type: surveyQuestionType('type').notNull(),
    questionText: varchar('question_text').notNull(),
    surveyId: integer('survey_id').notNull(),
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
