import { Hono } from 'hono'
import { ProfessorService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { createProfessorsDTO } from '../dtos/ProfessorDTO'

class ProfessorController {
  private router = new Hono()
  private professorService = new ProfessorService()

  public createProfessor = this.router.post(
    '/',
    zValidator('json', createProfessorsDTO),
    async (c) => {
      const { professorList } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          //data: await this.professorService.createProfessor(professorList),
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

  public getProfessors = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      //data: await this.professorService.getProfessors(),
      message: 'Professors retrieved',
      success: true,
    }
    return c.json(response)
  })

  public getProfessorDetail = this.router.get('/:professorId', async (c) => {
    const { professorId } = c.req.param()

    const response: ResponseAPI = {
      //data: await this.professorService.getProfessorDetail({
      //  professorId: professorId,
      //}),
      message: 'Professor retrieved',
      success: true,
    }
    return c.json(response)
  })
}

export default ProfessorController
