import { Hono } from 'hono'
import { ExternalService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { ExternalDAO } from '../daos/ExternalDAO'
class ExternalController {
  private router = new Hono()
  private externalService = new ExternalService()

  public getExternals = this.router.get('/', async (c) => {
    try {
      const response: ResponseAPI = {
        data: await this.externalService.getAllExternal(), // llamada al servicio
        success: true,
        message: 'Externals retrieved',
      }
      return c.json(response)
    } catch (error) {
      if (error instanceof LyceumError) {
        c.status(error.code)
      }
      throw error
    }
  })
}

export default ExternalController
