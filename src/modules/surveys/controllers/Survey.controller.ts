import { Hono } from 'hono'
import { SurveyService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { createSurveyDTO } from '../dtos/SurveyDTO'
import { z } from 'zod'
class SurveyController {
  private surveyService = new SurveyService()
  private router = new Hono()
  public getSpecialitySurveys = this.router.get(
    '/speciality/:unitId',
    zValidator('param', z.object({ unitId: z.coerce.number() })),
    async (c) => {
      const unitId = c.req.valid('param').unitId
      try {
        const response = await this.surveyService.getSpecialitySurveys(unitId)
        return c.json({
          data: response,
          message: 'Speciality surveys',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )
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

  public getUnAnsweredSurveys = this.router.get(
    '/',

    zValidator(
      'query',
      z.object({
        accountId: z.string(),
      })
    ),

    async (c) => {
      const { accountId } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.surveyService.getUnAnsweredSurveys(accountId),
          message: 'UnAnsweredSurveys correctly get',
          success: true,
        }
        return c.json(response)
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )
}
export default SurveyController
