import { Hono } from 'hono'
import { ThesisThemeService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'
import { createThesisDTO, insertThesisActionDTO } from '../dto/ThesisThemeDTO'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { z } from 'zod'
import { getDocument, insertDocument } from '@/aws/services'
import { stream } from 'hono/streaming'
import { bodyLimit } from 'hono/body-limit'

class ThesisThemeController {
  private router = new Hono()
  private thesisThemeService: ThesisThemeDAO = new ThesisThemeService()

  public getStudentThesisThemes = this.router.get(
    '/student/:studentCode',
    zValidator('param', z.object({ studentCode: z.string() })),
    async (c) => {
      const { studentCode } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.getStudentThesisRequests({
            studentCode,
          }),
          message: 'Thesis themes retrieved',
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

  public getAdvisorThesisThemes = this.router.get(
    '/advisor/:advisorCode',
    zValidator('param', z.object({ advisorCode: z.string() })),
    async (c) => {
      const { advisorCode } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.getProfessorThesisRequests({
            professorCode: advisorCode,
          }),
          message: 'Thesis themes retrieved',
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

  public getAreaThesisThemes = this.router.get(
    '/area/:areaId',
    zValidator('param', z.object({ areaId: z.string() })),
    async (c) => {
      const { areaId } = c.req.valid('param')
      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.getAreaThesisRequests({
            areaId: Number(areaId),
          }),
          message: 'Thesis themes retrieved',
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

  public getSpecialityThesisThemes = this.router.get(
    '/speciality/:specialityId',
    zValidator(
      'param',
      z.object({
        specialityId: z.string(),
      })
    ),
    zValidator(
      'query',
      z.object({
        filter: z
          .enum([
            'sended',
            'approvedByProfessor',
            'approvedByAreaCoordinator',
            'approvedByCareerDirector',
          ])
          .optional(),
      })
    ),
    async (c) => {
      const { specialityId } = c.req.valid('param')
      const { filter } = c.req.valid('query')
      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.getSpecialityThesisThemeRequest({
            specialityId: Number(specialityId),
            filter,
          }),
          message: 'Thesis themes retrieved',
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

  public getThesisThemeDetail = this.router.get('/:code', async (c) => {
    const { code } = c.req.param()
    try {
      const thesisDetail =
        await this.thesisThemeService.getThesisThemeRequestDetail({
          requestCode: code,
        })
      const response: ResponseAPI = {
        data: thesisDetail,
        message: 'Thesis detail retrieved',
        success: true,
      }
      return c.json(response)
    } catch (e) {
      if (e instanceof LyceumError) {
        c.status(e.code)
      }
      throw e
    }
  })

  public getThesisThemeDocument = this.router.get(
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

  public getThesisThemeActions = this.router.get(
    '/:code/history',
    async (c) => {
      const { code } = c.req.param()
      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.getThesisActions({
            requestCode: code,
          }),
          message: 'Thesis actions retrieved',
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

  public insertThesisThemeAction = this.router.post(
    '/:code/history',
    zValidator('form', insertThesisActionDTO),
    //TODO: obtener permiso del usuario
    //TODO obtener permiso de la ultima accion
    async (c) => {
      const { code } = c.req.param()
      const { content, isFile, action, accountId, roleId } = c.req.valid('form')

      try {
        const response: ResponseAPI = {
          data: await this.thesisThemeService.insertThemeRequestAction({
            content:
              content instanceof File
                ? await insertDocument({
                    bucketName: '',
                    file: content as File,
                  })
                : (content as string),
            isFile,
            action,
            accountId,
            roleId,
            requestCode: code,
          }),
          message: 'Thesis action inserted',
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

  public insertThesisThemeRequest = this.router.post(
    '/',
    zValidator('form', createThesisDTO),
    bodyLimit({ maxSize: 20 * 1024 * 1024 }),
    async (c) => {
      const newThesisData = c.req.valid('form')
      const advisors = JSON.parse(newThesisData.advisors)
      const students = JSON.parse(newThesisData.students)
      let content = ''

      try {
        content = await insertDocument({
          bucketName: '',
          file: newThesisData.justification as File,
        })

        const response: ResponseAPI = {
          data: await this.thesisThemeService.createThesisThemeRequest({
            title: newThesisData.title,
            areaId: Number(newThesisData.areaId),
            applicantCode: newThesisData.applicantCode,
            advisors,
            students,
            justification: content,
          }),
          message: 'Thesis request inserted',
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

export default ThesisThemeController
