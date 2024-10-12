import { Hono } from 'hono'
import { ThesisThemeService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { thesisActionsScheme } from '@/database/schema/thesisActions'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'
import { createThesisDTO, insertThesisActionDTO } from '../dto/createThesisDTO'

class ThesisThemeController {
  private router = new Hono()
  private thesisThemeService: ThesisThemeDAO = new ThesisThemeService()

  public getThesisThemes = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.thesisThemeService.getThesisThemeRequest(),
      message: 'Modules retrieved',
      success: true,
    }
    return c.json(response)
  })

  public getThesisThemeDetail = this.router.get('/:code', async (c) => {
    const { code } = c.req.param()
    const thesisDetail =
      await this.thesisThemeService.getThesisThemeRequestDetail({
        requestCode: code,
      })
    const success = !!thesisDetail
    const response: ResponseAPI = {
      data: thesisDetail,
      message: success ? 'Thesis detail retrieved' : 'Tesis no encontrada',
      success,
    }
    return c.json(response)
  })

  public getThesisThemeActions = this.router.get(
    '/:code/history',
    async (c) => {
      const { code } = c.req.param()

      const response: ResponseAPI = {
        data: await this.thesisThemeService.getthesisActions({
          requestCode: code,
        }),
        message: 'Thesis actions retrieved',
        success: true,
      }

      return c.json(response)
    }
  )

  public insertThesisThemeAction = this.router.post(
    '/:code/history',
    zValidator('json', insertThesisActionDTO),
    async (c) => {
      const { code } = c.req.param()
      const { content, isFile, action, accountId, roleId } = c.req.valid('json')

      const response: ResponseAPI = {
        data: await this.thesisThemeService.insertThemeRequestAction({
          content,
          isFile,
          action,
          accountId,
          roleId,
          requestCode: code,
        }),
        message: 'Thesis action inserted',
        success: true,
      }

      return c.json(response)
    }
  )

  public insertThesisThemeRequest = this.router.post(
    '/',
    zValidator('json', createThesisDTO),
    async (c) => {
      const newThesisData = c.req.valid('json')

      const response: ResponseAPI = {
        data: await this.thesisThemeService.createThesisThemeRequest(
          newThesisData
        ),
        message: 'Thesis request inserted',
        success: true,
      }

      return c.json(response)
    }
  )
}

export default ThesisThemeController
