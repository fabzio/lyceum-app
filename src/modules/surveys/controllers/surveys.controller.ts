/*
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import SurveyService from '../services/surveys.service'
import { createSurveyDTO } from '../dto/createSurveyDTO'

class SurveyController {
  private router = new Hono()
  private surveyService: SurveyService = new SurveyService()

  // Crear encuesta
  public createSurvey = this.router.post(
    '/',
    zValidator('json', createSurveyDTO), // Validamos la estructura de los datos entrantes
    async (c) => {
      const newSurvey = c.req.valid('json')

      try {
        // Creamos la encuesta
        const surveyData = await this.surveyService.createSurvey(newSurvey)

        const response: ResponseAPI = {
          data: surveyData,
          message: 'Survey created successfully',
          success: true,
        }
        return c.json(response)
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )
}

export default SurveyController
*/
