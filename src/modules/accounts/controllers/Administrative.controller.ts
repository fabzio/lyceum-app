import { Hono } from 'hono'
import { AdministrativeService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

class AdministrativeController {
  private router = new Hono()
  private administrativeService = new AdministrativeService()

  public getAdministrativeDetail = this.router.get(
    '/:code',
    zValidator(
      'param',
      z.object({
        //Acá validamos los parámetros traidos desde el front, sean de un tipo específico
        code: z.string().length(8), //Validamos que el code sea un string de 8 caracteres
      })
    ),
    async (c) => {
      //El c contiene la información que se trae desde el front
      const { code } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.administrativeService.getAdministrativeDetail({
            code,
          }),
          success: true,
          message: 'Administrative retrived',
        }
        return c.json(response)
      } catch (error) {
        if (error instanceof Error) {
          return c.json({
            success: false,
            message: error.message,
          })
        }
      }
    }
  )
}

export default AdministrativeController
