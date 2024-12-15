import { Hono } from 'hono'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { ScheduleGenericDAO } from '../dao/scheduleGenericDAO'
import { ScheduleGenericService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { assignJPDTO } from '../dto'
import { z } from 'zod'
import { insertStudentsInCourseDTO } from '../dto/scheduleGenericDTO'
class ScheduleGenericController {
  private router = new Hono()
  private scheduleGenericService: ScheduleGenericDAO =
    new ScheduleGenericService()
  public getSchedulesByCourse = this.router.get(
    '/:courseId',
    //zValidator('json', z.object({ courseId: z.number() })),
    async (c) => {
      const { courseId } = c.req.param()

      try {
        const schedules =
          await this.scheduleGenericService.fetchSchedulesByCourse(
            parseInt(courseId)
          )

        const response: ResponseAPI = {
          data: schedules,
          message: 'Schedules retrieved successfully',
          success: true,
        }

        return c.json(response)
      } catch (error) {
        console.error('Error retrieving schedules:', error)
        if (error instanceof LyceumError) {
          c.status(error.code)
        } else {
          c.status(500) // Internal Server Error
        }
        return c.json({
          success: false,
          message: 'Failed to retrieve schedules',
        })
      }
    }
  )
  public assignJP = this.router.post(
    '/assign-jp',
    zValidator('json', assignJPDTO),
    async (c) => {
      const { scheduleId, accountId } = c.req.valid('json')
      try {
        await this.scheduleGenericService.assignJP(scheduleId, accountId)
        return c.json({ success: true, message: 'JP assigned successfully' })
      } catch (error) {
        console.error('Error assigning JP:', error)
        if (error instanceof LyceumError) c.status(error.code)
        else c.status(500) // Error de servidor interno
        return c.json({ success: false, message: 'Failed to assign JP' })
      }
    }
  )
  public deleteJP = this.router.delete(
    '/deleteJP',
    zValidator(
      'query',
      z.object({
        id: z.string().uuid(), // Asumimos que el id de JP es un UUID
      })
    ),
    async (c) => {
      try {
        const { id } = c.req.valid('query')
        await this.scheduleGenericService.deleteJP(id) // Llamamos al servicio para eliminar el JP
        return c.json({ success: true, message: 'JP eliminado correctamente' })
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )
  public toggleLead = this.router.put(
    '/toggleLead',
    zValidator(
      'query',
      z.object({
        id: z.string().uuid(), // ID del usuario
      })
    ),
    zValidator(
      'json',
      z.object({
        courseCode: z.string(), // Código del curso
        scheduleCode: z.string(), // Código del horario
      })
    ),
    async (c) => {
      try {
        const { id } = c.req.valid('query')
        const { courseCode, scheduleCode } = c.req.valid('json')
        await this.scheduleGenericService.toggleLead(
          id,
          courseCode,
          scheduleCode
        ) // Llamamos al servicio para alternar el valor de 'lead'
        return c.json({
          success: true,
          message: 'Lead actualizado correctamente',
        })
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )

  public getAccountSchedules = this.router.get(
    '/account/schedules',
    zValidator(
      'query',
      z.object({
        accountId: z.string(), // ID del usuario
      })
    ),
    async (c) => {
      try {
        const { accountId } = c.req.valid('query')
        const schedules =
          await this.scheduleGenericService.getAccountSchedules(accountId)
        return c.json({ success: true, data: schedules })
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )

  public getAccountSchedulesAsStudent = this.router.get(
    '/account/schedulesStudent',
    zValidator(
      'query',
      z.object({
        accountId: z.string(), // ID del usuario
      })
    ),
    async (c) => {
      const {
        term: { id },
      } = c.get('jwtPayload')
      try {
        const { accountId } = c.req.valid('query')
        const schedules =
          await this.scheduleGenericService.getAccountSchedulesAsStudent(
            accountId
          )
        return c.json({ success: true, data: schedules })
      } catch (error) {
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        throw error
      }
    }
  )

  public insertStudentsInCourse = this.router.post(
    '/account/schedulesStudent/insert',
    zValidator('json', insertStudentsInCourseDTO),
    async (c) => {
      try {
        const { courseCode, students } = c.req.valid('json')
        await this.scheduleGenericService.insertStudentsInCourse(
          courseCode,
          students
        )
        return c.json({
          success: true,
          message: 'Students inserted successfully',
        })
      } catch (error) {
        console.error('Error inserting students:', error)
        if (error instanceof LyceumError) {
          c.status(error.code)
        }
        return c.json({ success: false, message: 'Failed to insert students' })
      }
    }
  )
}
export default ScheduleGenericController
