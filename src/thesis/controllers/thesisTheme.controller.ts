import { Hono } from 'hono'
import { ThesisThemeService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { thesisActionsScheme } from '@/database/schema/thesisActions'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'

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
    const response: ResponseAPI = {
      data: await this.thesisThemeService.getThesisThemeRequestDetail({
        requestCode: code,
      }),
      message: 'Thesis retrieved',
      success: true,
    }
    return c.json(response)
  })

  public getThesisThemeActions = this.router.get('/:code/history', async (c) => {
    const { code } = c.req.param()

    const response: ResponseAPI = {
      data: await this.thesisThemeService.getthesisActions({
        requestCode: code,
      }),
      message: 'Thesis actions retrieved',
      success: true,
    }

    return c.json(response)
  })

  public insertThesisThemeAction = this.router.post(
    '/:code/history',
    zValidator('json', thesisActionsScheme),
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
}

export default ThesisThemeController
