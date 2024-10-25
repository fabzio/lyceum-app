import { Hono } from 'hono'
import { ProfessorService } from '../services'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

class ProfessorController {
  private router = new Hono()
  private professorService = new ProfessorService()

  public getProfessors = this.router.get(
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
        const data = await this.professorService.getAllProfessors(filters)
        const response: ResponseAPI = {
          //TODO: Cambiar el mock data por la llamada al servicio
          data: data,
          success: true,
          message: 'Professors retrived',
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
}

export default ProfessorController
