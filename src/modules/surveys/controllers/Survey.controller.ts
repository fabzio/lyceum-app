import { Hono } from 'hono'
import { SurveyService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { createSurveyDTO, insertAnswerDTO } from '../dtos/SurveyDTO'
import { z } from 'zod'
class SurveyController {
  private surveyService = new SurveyService()
  private router = new Hono()
  public getSpecialitySurveys = this.router.get(
    '/speciality',
    zValidator('query', z.object({ unitId: z.coerce.number() })),
    async (c) => {
      const unitId = c.req.valid('query').unitId
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

  public getSurveyQuestions = this.router.get(
    '/:surveyId/questions',
    zValidator('param', z.object({ surveyId: z.coerce.number() })),
    async (c) => {
      const surveyId = c.req.valid('param').surveyId
      try {
        const response = await this.surveyService.getSurveyQuestions(surveyId)
        return c.json({
          data: response,
          message: 'Survey questions',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )

  public insertAnsweredSurvey = this.router.post(
    '/answers',
    zValidator('json', insertAnswerDTO),
    async (c) => {
      const answeredSurveyData = c.req.valid('json')
      try {
        const response =
          await this.surveyService.insertAnsweredSurvey(answeredSurveyData)
        return c.json({
          data: response,
          message: 'Answered survey inserted',
          success: true,
        })
      } catch (error) {
        if (error instanceof LyceumError) c.status(error.code)
        throw error
      }
    }
  )

  public getSurveyResults = this.router.get(
    '/:surveyId/results',
    zValidator('param', z.object({ surveyId: z.coerce.number() })),
    async (c) => {
      const surveyId = c.req.valid('param').surveyId
      try {
        const response = await this.surveyService.getSurveyResults(surveyId)
        return c.json({
          data: response,
          message: 'Survey results',
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
