import db from '@/database'
import { surveys } from '@/database/schema'
import { surveyQuestions } from '@/database/schema'
import { SurveyQuestionsSchema } from '@/database/schema/surveyQuestions'
import { SurveySchema } from '@/database/schema/surveys'

class SurveyService {
  // Crear encuesta y sus preguntas
  public async createSurvey(
    data: SurveySchema & { questions: SurveyQuestionsSchema[] }
  ) {
    const { name, questions, creatorId, unitId, surveyType } = data

    // Crear la encuesta
    const [survey] = await db
      .insert(surveys)
      .values({
        name,
        creatorId,
        unitId,
        creationDate: new Date().toISOString(),
        surveyType,
      })
      .returning()

    // Insertar preguntas
    for (const question of questions) {
      await db.insert(surveyQuestions).values({
        questionText: question.questionText,
        type: question.type,
        surveyId: survey.id, // Relacionamos la pregunta con la encuesta creada
        options: question.options || [], // Guardamos las opciones de la pregunta si existen
      })
    }

    return survey
  }
}

export default SurveyService
