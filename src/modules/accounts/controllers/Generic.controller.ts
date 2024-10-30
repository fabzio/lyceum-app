import { Hono } from 'hono'
import GenericService from '../services/Generic.service'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class GenericController {
  private router = new Hono()
  private accountService = new GenericService()

  public getAccount = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        q: z.string(),
        userType: z.string().optional(),
      })
    ),
    async (c) => {
      const { q, userType } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.accountService.getAccount({
            q,
            userType: parseInt(userType ?? ''),
          }),
          message: 'Account retrieved',
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

export default GenericController
