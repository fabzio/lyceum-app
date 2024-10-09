import { Hono } from 'hono'
import { ThesisThemeService } from '../services'

class ThesisThemeController {
  private router = new Hono()
  private thesisThemeService = new ThesisThemeService()

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

  public getThesisThemeActions = this.router.get(':code/history', async (c) => {
    const { code } = c.req.param()

    const response: ResponseAPI = {
      data: await this.thesisThemeService.getThesisThemeRequestActions({
        requestCode: code,
      }),
      message: 'Thesis actions retrieved',
      success: true,
    }

    return c.json(response)
  })
}

export default ThesisThemeController
