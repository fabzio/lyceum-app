import { Hono } from 'hono'
import { HiringSelectionService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { HiringSelectionDAO } from '../dao'
import { getDocument, insertDocument } from '@/aws/services'
import { bodyLimit } from 'hono/body-limit'
import { stream } from 'hono/streaming'
import {
  updateHiringSelectionStatusDTO,
  getCandidateHiringListDTO,
} from '../dtos'
import { z, ZodObject } from 'zod'
import {
  createHiringSelectionDTO,
  getHiringsWithCoursesQueryDTO,
  getRequirementsScoresQueryDTO,
  hiringsWithCoursesDTO,
  HiringsWithCoursesDTO,
  insertJobRequestActionDTO,
} from '../dtos/hiringSelectionDTO'
class HiringSelectioncontroller {
  private router = new Hono()

  private hiringSelectionService: HiringSelectionDAO =
    new HiringSelectionService()
  public createHiringSelection = this.router.post(
    '/',
    zValidator('json', createHiringSelectionDTO),
    async (c) => {
      const newHiring = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.createHiringSelection(
            newHiring
          ),
          message: 'Hiring Selection correctly created',
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

  public updateJobRequestStatus = this.router.put(
    '/:jobRequestId/status',
    zValidator(
      'param',
      z.object({
        jobRequestId: z.string(),
      })
    ),
    zValidator('json', updateHiringSelectionStatusDTO),
    async (c) => {
      const { jobRequestId } = c.req.valid('param')
      const {
        newStatus,
        evaluatorId,
        observation,
        evaluationList = [],
      } = c.req.valid('json')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.updateHiringSelectionStatus(
            +jobRequestId,
            newStatus,
            evaluatorId,
            observation,
            evaluationList
          ),
          message: 'JobRequest Status correctly changed',
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

  public getHiringCandidates = this.router.get(
    '/:hiringId/:courseHiringId/',
    zValidator(
      'param',
      z.object({
        hiringId: z.string(),
        courseHiringId: z.string(),
      })
    ),
    zValidator(
      'query',
      z.object({
        step: z.enum(['first', 'second', 'selected']),
      })
    ),
    async (c) => {
      const { hiringId } = c.req.valid('param')
      const { courseHiringId } = c.req.valid('param')
      const { step } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.getCandidateHiringList(
            +hiringId,
            +courseHiringId,
            step
          ),
          message: 'CandidateList Status correctly get',
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

  public getRequirements = this.router.get(
    '/:hiringId/:courseId/requirements',
    zValidator(
      'param',
      z.object({
        hiringId: z.string(),
        courseId: z.string(),
      })
    ),
    async (c) => {
      const { hiringId, courseId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.getHiringRequirements(
            +hiringId,
            +courseId
          ),
          message: 'Job application requirements detail retrieved successfully',
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

  public getRequirementsScores = this.router.get(
    `/:jobRequestId/scores`,
    zValidator(
      'param',
      z.object({
        jobRequestId: z.string(),
      })
    ),
    async (c) => {
      const { jobRequestId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.getRequirementsScores(
            +jobRequestId
          ),
          message: 'Job application requirements detail retrieved successfully',
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

  public getJobRequestDetail = this.router.get(
    '/:jobRequestId/view',
    zValidator(
      'param',
      z.object({
        jobRequestId: z.string(),
      })
    ),
    zValidator(
      'query',
      z.object({
        courseHiringId: z.string(),
        accountId: z.string(),
      })
    ),
    async (c) => {
      const { courseHiringId } = c.req.valid('query')
      const { accountId } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.getJobRequestDetail(
            courseHiringId,
            accountId
          ),
          message: 'Job request detail retrieved successfully',
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

  public putNewJobRequest = this.router.post(
    '/:hiringProcessId/apply',
    zValidator('form', insertJobRequestActionDTO),
    bodyLimit({ maxSize: 15 * 1024 * 1024 }),
    zValidator(
      'param',
      z.object({
        hiringProcessId: z.string(),
      })
    ),
    async (c) => {
      const { hiringProcessId } = c.req.valid('param')
      const { accountId, motivation, documents, processId } =
        c.req.valid('form')

      try {
        const response: ResponseAPI = {
          data: await this.hiringSelectionService.putNewJobRequest({
            candidateAccount: accountId,
            jrMotivation: motivation,
            courseHiringId: processId,
            file:
              documents instanceof File
                ? await insertDocument({
                    bucketName: '',
                    file: documents as File,
                  })
                : (documents as string),
          }),
          message: 'Job request addded successfully',
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

  public getApplicationDocuments = this.router.get(
    '/documents/:docId',
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

  public getHiringsWithCourses = this.router.get(
    '/',
    zValidator('query', getHiringsWithCoursesQueryDTO),
    async (c) => {
      try {
        const filters = c.req.valid('query')
        const response = {
          data: await this.hiringSelectionService.getHiringsWithCoursesByUnit(
            filters.unitId,
            filters.accountId,
            filters
          ),
          success: true,
          message: 'Hirings with courses retrieved successfully',
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

  public getMotivation = this.router.get(
    '/:hiringId/:courseHiringId/:accountId/motivation',
    zValidator('query', z.object({ id: z.string() })), // Validate that the parameter is a number
    async (c) => {
      try {
        const { id } = c.req.valid('query')
        const result =
          await this.hiringSelectionService.getCandidateMotivationAndObservation(
            +id
          )
        // Construct the success response
        const response = {
          data: result,
          success: true,
          message: `Información de la aplicación ${id} recuperada`,
        }

        return c.json(response)
      } catch (error) {
        // Error handling
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )

  public getJobRequestsFromUser = this.router.get(
    '/:accountId/applications-list',
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
          data: await this.hiringSelectionService.getJobRequests(accountId),
          message: 'Job request detail retrieved successfully',
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

export default HiringSelectioncontroller
