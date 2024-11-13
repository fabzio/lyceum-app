import { surveys, SurveySchema } from '@/database/schema/surveys'
import { CreateSurveyDTO } from '../dtos'
import db from '@/database'
import { and, eq } from 'drizzle-orm'
import { units } from '@/database/schema'
import { surveyQuestions } from '@/database/schema/surveyQuestions'

class SurveyService {
  public async createSurvey(surveyData: CreateSurveyDTO) {
    const exisitngUnit = await db.query.units.findFirst({
      columns: {
        id: true,
      },
      where: and(eq(units.id, surveyData.unitId), eq(units.type, 'speciality')),
    })
    if (!exisitngUnit) throw new Error('Especialidad no encontrada')

    await db.transaction(async (tx) => {
      const [newSurvey] = await tx
        .insert(surveys)
        .values(surveyData)
        .returning({
          id: surveys.id,
        })

      await tx.insert(surveyQuestions).values(
        surveyData.questions.map((question) => ({
          questionText: question.text,
          surveyId: newSurvey.id,
          type: question.type,
        }))
      )
    })
  }
}
export default SurveyService
