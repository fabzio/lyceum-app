import { Hono } from 'hono'
import { AdministrativeService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createAdministrativesDTO } from '../dtos/AdministrativeDTO'
import { AdministrativeDAO } from '../daos'
import { LyceumError } from '@/middlewares/errorMiddlewares'

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
  public getAdministratives = this.router.get(
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
        const filters = c.req.valid('query')
        const data = await this.administrativeService.getAllAdministratives(
          filters
        )
        const response: ResponseAPI = {
          data: data,
          success: true,
          message: 'Administratives retrived',
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
  //TODO: Implementar el resto de los metodos

  public uploadAdministrativeList = this.router.post(
    '/',
    zValidator('json', createAdministrativesDTO),
    async (c) => {
      const { administrativeList } = c.req.valid('json')

      try {
        const response: ResponseAPI = {
          data: await this.administrativeService.uploadAdministrativeList(
            administrativeList
          ),
          message: 'Administrative users correctly created',
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

export default AdministrativeController
