import db from '@/database'
import { courses, scheduleAccounts, schedules, terms } from '@/database/schema'
import { and, eq, sql } from 'drizzle-orm'
import { ScheduleGenericDAO } from '../dao/scheduleGenericDAO'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { Account } from '@/interfaces/models/Account'
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
  public async deleteJP(id: string): Promise<void> {
    try {
      await db
        .delete(scheduleAccounts) // Eliminar el JP de la tabla scheduleAccounts
        .where(eq(scheduleAccounts.accountId, id)) // Condición para eliminar por el ID
    } catch (error) {
      throw new Error(`No se pudo eliminar el JP con ID: ${id}`)
    }
  }
  public async toggleLead(id: string): Promise<void> {
    try {
      // Obtener el valor actual de 'lead' para el estudiante
      const currentLead = await db
        .select({ lead: scheduleAccounts.lead })
        .from(scheduleAccounts)
        .where(eq(scheduleAccounts.accountId, id))
        .limit(1)
        .then((res) => res[0]?.lead)

      // Alternar el valor de 'lead'
      const newLeadValue = currentLead === true ? false : true

      // Actualizar el valor de 'lead' en scheduleAccounts
      await db
        .update(scheduleAccounts)
        .set({ lead: newLeadValue })
        .where(eq(scheduleAccounts.accountId, id))
    } catch (error) {
      throw new Error(`No se pudo alternar el valor de lead para el ID: ${id}`)
    }
  }

  public async getAccountSchedules(accountId: Account['id']) {
    return await db
      .select({
        id: scheduleAccounts.scheduleId,
        code: schedules.code,
        courseName: courses.name,
      })
      .from(scheduleAccounts)
      .innerJoin(schedules, eq(schedules.id, scheduleAccounts.scheduleId))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .innerJoin(courses, eq(courses.id, schedules.courseId))
      .where(
        and(eq(scheduleAccounts.accountId, accountId), eq(terms.current, true))
      )
  }
}
export default ScheduleGenericService
