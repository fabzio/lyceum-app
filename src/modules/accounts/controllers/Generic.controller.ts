import { Hono } from 'hono'
import GenericService from '../services/Generic.service'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class GenericController {
  private router = new Hono()
  private accountService = new GenericService()

  public getAccountsBySchedule = this.router.get(
    '/bySchedule',
    zValidator(
      'query',
      z.object({
        q: z.string().optional(),
        page: z.string().transform((v) => parseInt(v)),
        limit: z.string().transform((v) => parseInt(v)),
        sortBy: z.string().optional(),
        scheduleId: z.string().optional(),
      })
    ),
    async (c) => {
      try {
        const filters = c.req.valid('query')
        const data = await this.accountService.getAccountsBySchedule(filters)
        const response: ResponseAPI = {
          data: data,
          success: true,
          message: 'Accounts retrived by schedule',
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

  public updateAccount = this.router.put(
    ':accountId',
    zValidator(
      'json',
      z.object({
        name: z.string().optional(),
        firstSurname: z.string().optional(),
        secondSurname: z.string().optional(),
        email: z.string().optional(),
        state: z.enum(['active', 'inactive', 'deleted']).optional(),
        unitId: z.number().optional(),
        code: z.string().optional(),
        speciality: z.string().optional(),
      })
    ),
    async (c) => {
      const accountId = c.req.param('accountId') // Extrae accountId de la URL
      const updateData = c.req.valid('json') // Extrae el payload del cuerpo de la solicitud

      try {
        const response = await this.accountService.updateAccount(
          accountId,
          updateData
        )

        return c.json({
          data: response,
          message: 'Account information updated successfully',
          success: true,
        })
      } catch (error) {
        console.error('Error updating account:', error)

        c.status(500)
        return c.json({
          message: 'Failed to update account information',
          success: false,
        })
      }
    }
  )

  public getProfile = this.router.get(
    '/profile/:accountId',
    zValidator('param', z.object({ accountId: z.string() })),
    async (c) => {
      const { accountId } = c.req.valid('param')
      try {
        const response = await this.accountService.getProfile(accountId)
        return c.json({
          data: response,
          message: 'Profile retrieved',
          success: true,
        })
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
