import db from '@/database'
import { scheduleAccounts, schedules } from '@/database/schema'
import { and, eq, sql } from 'drizzle-orm'
import { ScheduleGenericDAO } from '../dao/scheduleGenericDAO'
import { LyceumError } from '@/middlewares/errorMiddlewares'
class ScheduleGenericService implements ScheduleGenericDAO {
  public async fetchSchedulesByCourse(courseId: number) {
    // Validación 1: Verifica que el courseId no sea nulo o indefinido
    if (!courseId) {
      throw new Error('courseId es obligatorio')
    }
    // Consultamos los horarios asociados al curso
    const courseSchedules = await db
      .select({
        id: schedules.id,
        code: schedules.code,
        termId: schedules.termId,
        state: schedules.state,
        visibility: schedules.visibility,
      })
      .from(schedules)
      .where(eq(schedules.courseId, courseId))
    // Validación 2: Verifica si se encontraron horarios
    if (courseSchedules.length === 0) {
      throw new Error('No se encontraron horarios para el curso especificado')
    }
    return courseSchedules
  }
  public async assignJP(scheduleId: number, accountId: string) {
    if (!scheduleId || !accountId) {
      throw new Error('scheduleId y accountId son obligatorios')
    }

    const assignmentExists = await db
      .select({ count: sql<string>`count(*)` })
      .from(scheduleAccounts)
      .where(
        and(
          eq(scheduleAccounts.scheduleId, scheduleId),
          eq(scheduleAccounts.accountId, accountId)
        )
      )

    if (+assignmentExists[0].count > 0) {
      throw new Error('El usuario ya tiene asignado este horario')
    }

    await db.insert(scheduleAccounts).values({
      scheduleId: scheduleId,
      accountId: accountId,
      roleId: null,
      lead: null,
    })
  }
}
export default ScheduleGenericService
