import { Hono } from 'hono'
import { SurveyService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { createSurveyDTO } from '../dtos/SurveyDTO'

class SurveyController {
  private surveyService = new SurveyService()
  private router = new Hono()
  public createSurvey = this.router.post(
    '/',
    zValidator('json', createSurveyDTO),
    async (c) => {
      const surveyData = c.req.valid('json')
      try {
        const response = await this.surveyService.createSurvey(surveyData)
        return c.json({
          data: response,
          message: 'Survey created',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )
}
export default SurveyController
