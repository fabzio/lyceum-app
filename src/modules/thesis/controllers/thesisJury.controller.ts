import { Hono } from 'hono'
import { ThesisJuryService } from '../services'
import { ThesisJuryDAO } from '../dao/thesisJuryDAO'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'

class ThesisJuryController {
  private router = new Hono()
  private thesisJuryService: ThesisJuryDAO = new ThesisJuryService()

  public startJuryRequest = this.router.post('/:code', async (c) => {
    const { code } = c.req.param()
    try {
      await this.thesisJuryService.startJuryRequest({ requestCode: code })
      return c.json({ message: 'Jury request started', success: true })
    } catch (error) {
      if (error instanceof LyceumError) {
        c.status(error.code)
      }
      throw error
    }
  })

  public getThesisJuryRequest = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        unitID: z.coerce.number(),
        filter: z.enum(['unassigned', 'requested', 'assigned']).optional(),
      })
    ),
    async (c) => {
      const { unitID, filter } = c.req.valid('query')

      try {
        console.log(unitID, filter)
        const response = await this.thesisJuryService.getThesisJuryRequests(
          unitID,
          filter
        )
        return c.json({
          data: response,
          message: 'Jury request retrieved',
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

  public getThesisJuries = this.router.get('/:code/juries', async (c) => {
    const { code } = c.req.param()
    try {
      const response = await this.thesisJuryService.getThesisJuries({
        requestCode: code,
      })
      return c.json({
        data: response,
        message: 'Juries retrieved',
        success: true,
      })
    } catch (error) {
      if (error instanceof LyceumError) {
        c.status(error.code)
      }
      throw error
    }
  })

  public insertThesisJuries = this.router.post(
    '/:code/juries',
    zValidator(
      'json',
      z.object({
        codeList: z.array(z.string()),
      })
    ),
    async (c) => {
      const { code } = c.req.param()
      const { codeList } = c.req.valid('json')

      try {
        await this.thesisJuryService.insertThesisJuries({
          thesisCode: code,
          listAccountCode: codeList,
        })
        return c.json({ message: 'Juries inserted', success: true })
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )

  public getThesisByStudentCode = this.router.get(
    '/search/:studentCode',
    async (c) => {
      const { studentCode } = c.req.param()
      try {
        const response = await this.thesisJuryService.getThesisByStudentCode({
          studentCode,
        })
        return c.json({
          data: response,
          message: 'Thesis retrieved',
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

export default ThesisJuryController
