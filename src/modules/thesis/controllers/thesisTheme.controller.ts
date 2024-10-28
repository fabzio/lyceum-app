import { Hono } from 'hono'
import { ThesisThemeService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'
import { createThesisDTO, insertThesisActionDTO } from '../dto/ThesisThemeDTO'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class ThesisThemeController {
  private router = new Hono()
  private thesisThemeService: ThesisThemeDAO = new ThesisThemeService()

  public getThesisThemes = this.router.get('/', async (c) => {
    try {
      const response: ResponseAPI = {
        data: await this.thesisThemeService.getThesisThemeRequest(),
        message: 'Thesis themes retrieved',
        success: true,
      }
      return c.json(response)
    } catch (error) {
      if (error instanceof LyceumError) {
        c.status(error.code)
      }
    }
  })

  public getThesisThemeDetail = this.router.get('/:code', async (c) => {
    const { code } = c.req.param()
    try {
      const thesisDetail =
        await this.thesisThemeService.getThesisThemeRequestDetail({
          requestCode: code,
        })
      const response: ResponseAPI = {
        data: thesisDetail,
        message: 'Thesis detail retrieved',
        success: true,
      }
      return c.json(response)
    } catch (e) {
      if (e instanceof LyceumError) {
        c.status(e.code)
      }
      throw e
    }
  })

  public getThesisThemeActions = this.router.get(
    '/:code/history',
    async (c) => {
      const { code } = c.req.param()
      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.getThesisActions({
            requestCode: code,
          }),
          message: 'Thesis actions retrieved',
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

  public insertThesisThemeAction = this.router.post(
    '/:code/history',
    zValidator('json', insertThesisActionDTO),
    //TODO: obtener permiso del usuario
    //TODO obtener permiso de la ultima accion
    async (c) => {
      const { code } = c.req.param()
      const { content, isFile, action, accountId, roleId } = c.req.valid('json')
 
      try {
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
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )

  public insertThesisThemeRequest = this.router.post(
    '/',
    zValidator('json', createThesisDTO),
    async (c) => {
      const newThesisData = c.req.valid('json')

      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.createThesisThemeRequest(
            newThesisData
          ),
          message: 'Thesis request inserted',
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

export default ThesisThemeController
