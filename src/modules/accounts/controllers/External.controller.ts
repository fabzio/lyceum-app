import { Hono } from 'hono'
import { ExternalService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { ExternalDAO } from '../daos/ExternalDAO'

class ExternalController {
  private router = new Hono()
  private externalService: ExternalDAO = new ExternalService()

  public getExternals = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.string().transform((v) => parseInt(v)),
        limit: z.string().transform((v) => parseInt(v)),
        sortBy: z.string().optional(),
      })
    ),
    async (c) => {
      try {
        const response: ResponseAPI = {
          data: await this.externalService.getAllExternals(),  // llamada al servicio
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
    }
  )
}

export default ExternalController
