import { Hono } from 'hono'
import { ThesisJuryService } from '../services'
import { ThesisJuryDAO } from '../dao/thesisJuryDAO'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

class ThesisJuryController {
  private router = new Hono()
  private thesisJuryService: ThesisJuryDAO = new ThesisJuryService()

  public startJuryRequest = this.router.post('/:code', async (c) => {
    const { code } = c.req.param()
    await this.thesisJuryService.startJuryRequest({ requestCode: code })
    return c.json({ message: 'Jury request started', success: true })
  })

  public getThesisJuryRequest = this.router.get('/', async (c) => {
    const response = await this.thesisJuryService.getThesisJuryRequests()
    return c.json({
      data: response,
      message: 'Jury request retrieved',
      success: true,
    })
  })

  public getThesisJuries = this.router.get('/:code/juries', async (c) => {
    const { code } = c.req.param()
    const response = await this.thesisJuryService.getThesisJuries({
      requestCode: code,
    })
    return c.json({
      data: response,
      message: 'Juries retrieved',
      success: true,
    })
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
      await this.thesisJuryService.insertThesisJuries({
        thesisCode: code,
        listAccountCode: codeList,
      })
      return c.json({ message: 'Juries inserted', success: true })
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
      } catch (e) {
        return c.json({
          data: null,
          message: 'No se encontró una tesis aprobada del estudiante',
          success: false,
        })
      }
    }
  )
}

export default ThesisJuryController
