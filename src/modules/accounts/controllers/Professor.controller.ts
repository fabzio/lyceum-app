import { Hono } from 'hono'
import { ProfessorService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { ProfessorDAO } from '../daos/ProfessorDAO'
import { createProfessorsDTO } from '../dtos/ProfessorDTO'

class ProfessorController {
  private router = new Hono()
  private professorService: ProfessorDAO = new ProfessorService()

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
  public getProfessorDetail = this.router.get(
    '/:code',
    zValidator(
      'param',
      z.object({
        code: z.string().length(8),
      })
    ),
    async (c) => {
      const { code } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.professorService.getProfessorDetail({ code }),
          success: true,
          message: 'Professor retrived',
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

  //TODO: Implementar INSERTAR
  public createProfessor = this.router.post(
    '/',
    zValidator('json', createProfessorsDTO),
    async (c) => {
      const { professorList } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.professorService.createProfessor(
            professorList.map((professor) => ({
              code: professor.code,
              name: professor.name,
              firstSurname: professor.first_surname,
              secondSurname: professor.second_surname,
              email: professor.email,
            }))
          ),
          message: 'Professor created',
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

export default ProfessorController
