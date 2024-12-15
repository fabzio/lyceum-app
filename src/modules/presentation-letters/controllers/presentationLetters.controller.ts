import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import {
  createPresentationLetterDTO,
  updatePresentationLetterDTO,
} from '../dto'
import { PresentationLettersService } from '../services'
import { getDocument, insertDocument } from '@/aws/services'
import { stream } from 'hono/streaming'

class PresentationLetterController {
  private router = new Hono()
  private presentatioLetterService = new PresentationLettersService()

  public getDocument = this.router.get(
    '/document/:docId',
    zValidator('param', z.object({ docId: z.string() })),
    async (c) => {
      const { docId } = c.req.param()
      try {
        const thesisDoc = await getDocument({
          bucketName: '',
          docId,
        })
        const byteArray = await thesisDoc.data
        if (byteArray === undefined) {
          throw new Error('Error al obtener el archivo')
        }
        c.header('Content-Type', thesisDoc.contentType)
        return stream(c, async (stream) => {
          stream.onAbort(() => {
            console.log('Stream aborted')
          })
          await stream.write(byteArray)
        })
      } catch (e) {
        if (e instanceof LyceumError) {
          c.status(e.code)
        }
        throw e
      }
    }
  )

  public getPresentationLetterDetail = this.router.get(
    '/:presentationLetterId',
    zValidator(
      'param',
      z.object({
        presentationLetterId: z.coerce.number(),
      })
    ),
    async (c) => {
      const { presentationLetterId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.getPresentationLetterDetail(
            presentationLetterId
          ),
          message: 'Presentation letter detail',
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
      const { companyName, description, accounts, scheduleId } =
        c.req.valid('form')
      const accountsParse = JSON.parse(accounts) as Array<{ id: string }>
      const { requesterId } = c.req.param()
      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.createPresentationLetter({
            requesterId,
            companyName,
            scheduleId,
            /*
            documentId: await insertDocument({
              file: documentFile as File,
              bucketName: 'document',
            }),
            */
            description,
            accountsParse,
          }),
          message: 'Presentation Letter created',
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

  public updatePresentationLetter = this.router.post(
    '/updatePresentationCard/:id',
    zValidator(
      'param',
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      'form',
      z.object({
        documentFile: z.instanceof(File),
      })
    ),
    async (c) => {
      const { documentFile } = c.req.valid('form')
      const { id } = c.req.param()
      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.updatePresentationLetter({
            documentId: await insertDocument({
              file: documentFile as File,
              bucketName: 'document',
            }),
            id,
          }),
          message: 'Presentation Letter updated',
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

  public getAllsPresentationLetterInUnit = this.router.get(
    '/',
    zValidator(
      'query',
      z.object({
        unitId: z.coerce.number(),
      })
    ),

    async (c) => {
      const { unitId } = c.req.valid('query')

      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.getPresentationLetterByUnit(
            { UnitId: unitId }
          ),

          message: 'Presentation letters retrieved successfully',
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

  public getAllsPresentationLetterByAccount = this.router.get(
    '/list/:accountId',
    zValidator(
      'param',
      z.object({
        accountId: z.string(),
      })
    ),

    async (c) => {
      const { accountId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.getPresentationLetterByAccount(
            { id: accountId }
          ),
          message: 'Presentation letters retrieved successfully',
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

  public updateStatusOfAPresentationLetter = this.router.put(
    '/:presentationLetterID',
    zValidator('param', z.object({ presentationLetterID: z.string() })),
    zValidator('json', updatePresentationLetterDTO),
    async (c) => {
      const { presentationLetterID } = c.req.valid('param')
      const { observation, reviewerId, status } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.updateStatusOfAPresentationLetter(
            {
              presentationLetterID: Number(presentationLetterID),
              observation,
              reviewerId,
              status,
            }
          ),
          message: 'Presentation letters updated successfully',
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

  public approveOrDenegateAPresentationLetter = this.router.put(
    '/approve-or-denegate/',
    zValidator(
      'query',
      z.object({
        presentationLetterID: z.coerce.number(),
        status: z.enum(['accepted', 'rejected', 'succeeded']),
      })
    ),
    async (c) => {
      const { presentationLetterID, status } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.presentatioLetterService.approveOrDenegateAPresentationLetter(
            { presentationLetterID: presentationLetterID, status: status }
          ),
          message: 'Presentation letters retrieved successfully',
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
