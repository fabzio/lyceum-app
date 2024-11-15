import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { createPresentationLetterDTO } from '../dto'
import { PresentationLettersService } from '../services'
import { insertDocument } from '@/aws/services'

class PresentationLetterController {
  private router = new Hono()
  private presentatioLetterService = new PresentationLettersService()

  public startPresentationLetter = this.router.post(
    '/:requesterId',
    zValidator(
      'param',
      z.object({
        requesterId: z.string(),
      })
    ),
    zValidator('form', createPresentationLetterDTO),
    async (c) => {
      const { companyName, description, documentFile, accounts, scheduleId } =
        c.req.valid('form')
      const accountsParse = JSON.parse(accounts) as Array<{ id: string }>
      const { requesterId } = c.req.param()
      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.createPresentationLetter({
            requesterId,
            companyName,
            scheduleId,
            documentId: await insertDocument({
              file: documentFile,
              bucketName: 'document',
            }),
            description,
            accountsParse,
          }),
          message: 'Students created',
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

export default PresentationLetterController
