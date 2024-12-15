import db from '@/database'
import {
  accounts,
  courses,
  scheduleAccounts,
  schedules,
  terms,
} from '@/database/schema'
import { and, eq, sql } from 'drizzle-orm'
import { ScheduleGenericDAO } from '../dao/scheduleGenericDAO'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { Account } from '@/interfaces/models/Account'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
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
  public async toggleLead(
    id: string,
    courseCode: string,
    scheduleCode: string
  ): Promise<void> {
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
      const courseId = await db
        .select({ id: courses.id })
        .from(courses)
        .where(eq(courses.code, courseCode))
        .limit(1)
        .then((res) => res[0]?.id)

      const scheduleId = await db
        .select({ id: schedules.id })
        .from(schedules)
        .where(
          and(
            eq(schedules.code, scheduleCode),
            eq(schedules.courseId, courseId)
          )
        )
        .limit(1)
        .then((res) => res[0]?.id)
      await db
        .update(scheduleAccounts)
        .set({ lead: newLeadValue })

        .where(
          and(
            eq(scheduleAccounts.accountId, id),
            eq(scheduleAccounts.scheduleId, scheduleId)
          )
        )
    } catch (error) {
      throw new Error(`No se pudo alternar el valor de lead para el ID: ${id}`)
    }
  }

  public async getAccountSchedules(accountId: Account['code']) {
    return await db
      .select({
        id: scheduleAccounts.scheduleId,
        code: schedules.code,
        courseName: courses.name,
        courseId: courses.id,
        courseCode: courses.code,
      })
      .from(scheduleAccounts)
      .innerJoin(schedules, eq(schedules.id, scheduleAccounts.scheduleId))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .innerJoin(courses, eq(courses.id, schedules.courseId))
      .innerJoin(accounts, eq(accounts.id, scheduleAccounts.accountId))
      .where(and(eq(accounts.code, accountId), eq(terms.current, true)))
  }

  public async getAccountSchedulesAsStudent(accountId: Account['code']) {
    return await db
      .select({
        id: scheduleAccounts.scheduleId,
        code: schedules.code,
        courseName: courses.name,
        courseId: courses.id,
        courseCode: courses.code,
      })
      .from(scheduleAccounts)
      .innerJoin(schedules, eq(schedules.id, scheduleAccounts.scheduleId))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .innerJoin(courses, eq(courses.id, schedules.courseId))
      .innerJoin(accounts, eq(accounts.id, scheduleAccounts.accountId))
      .where(
        and(
          eq(accounts.code, accountId),
          eq(terms.current, true),
          eq(scheduleAccounts.roleId, BaseRoles.STUDENT)
        )
      )
  }

  public async insertStudentsInCourse(
    courseCode: string,
    students: { studentCode: string; scheduleCode: string }[]
  ) {
    const currentTerm = await db
      .select({ id: terms.id })
      .from(terms)
      .where(eq(terms.current, true))
      .limit(1)
      .then((res) => res[0]?.id)

    if (!currentTerm) {
      throw new Error('No se encontró el término actual')
    }

    const course = await db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.code, courseCode))
      .limit(1)
      .then((res) => res[0]?.id)

    if (!course) {
      throw new Error('No se encontró el curso con el código especificado')
    }

    for (const student of students) {
      const account = await db
        .select({ id: accounts.id })
        .from(accounts)
        .where(eq(accounts.code, student.studentCode))
        .limit(1)
        .then((res) => res[0]?.id)

      if (!account) {
        throw new Error(
          `No se encontró el estudiante con el código ${student.studentCode}`
        )
      }

      const schedule = await db
        .select({ id: schedules.id })
        .from(schedules)
        .where(
          and(
            eq(schedules.code, student.scheduleCode),
            eq(schedules.courseId, course),
            eq(schedules.termId, currentTerm)
          )
        )
        .limit(1)
        .then((res) => res[0]?.id)

      if (!schedule) {
        throw new Error(
          `No se encontró el horario con el código ${student.scheduleCode} para el curso y término actual`
        )
      }

      const assignmentExists = await db
        .select({ count: sql<string>`count(*)` })
        .from(scheduleAccounts)
        .where(
          and(
            eq(scheduleAccounts.scheduleId, schedule),
            eq(scheduleAccounts.accountId, account)
          )
        )
        .then((res) => res[0]?.count)

      if (+assignmentExists > 0) {
        console.log(
          `El estudiante con el código ${student.studentCode} ya está registrado en el horario ${student.scheduleCode}`
        )
        continue
      }

      await db.insert(scheduleAccounts).values({
        scheduleId: schedule,
        accountId: account,
        roleId: BaseRoles.STUDENT,
        lead: false,
      })
    }
  }
}
export default ScheduleGenericService
