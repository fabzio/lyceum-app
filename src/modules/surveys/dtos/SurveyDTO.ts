import { surveyQuestionsSchema } from '@/database/schema/surveyQuestions'
import { surveySchema } from '@/database/schema/surveys'
import { accountsSchema } from '@/database/schema/accounts'
import { z } from 'zod'

export const createSurveyDTO = z.object({
  name: surveySchema.shape.name,
  creatorId: surveySchema.shape.creatorId,
  unitId: surveySchema.shape.unitId,
  endDate: z.coerce.date(),
  surveyType: surveySchema.shape.surveyType,
  questions: z
    .array(
      z.object({
        text: surveyQuestionsSchema.shape.questionText,
        type: surveyQuestionsSchema.shape.type,
      })
    )
    .nonempty(),
})
export type CreateSurveyDTO = z.infer<typeof createSurveyDTO>

export const insertAnswerDTO = z.object({
  questions: z.array(
    z.object({
      id: z.number(),
      questionText: z.string(),
      type: z.string(),
      answer: z.string(),
    })
  ),
  evaluatorAccountId: z.string(),
  subjectAccountId: z.string(),
  scheduleId: z.number(),
})

export type InsertAnswerDTO = z.infer<typeof insertAnswerDTO>
