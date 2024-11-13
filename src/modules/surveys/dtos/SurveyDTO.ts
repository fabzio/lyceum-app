import { surveyQuestionsSchema } from '@/database/schema/surveyQuestions'
import { surveySchema } from '@/database/schema/surveys'
import { z } from 'zod'

export const createSurveyDTO = z.object({
  name: surveySchema.shape.name,
  creatorId: surveySchema.shape.creatorId,
  unitId: surveySchema.shape.unitId,
  endDate: surveySchema.shape.endDate,
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
