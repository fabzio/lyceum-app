import db from '@/database'
import {
  accounts,
  courses,
  riskReasons,
  riskStudentReports,
  riskStudents,
  scheduleAccounts,
  schedules,
  terms,
  units,
} from '@/database/schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import {
  aliasedTable,
  and,
  asc,
  desc,
  eq,
  ilike,
  inArray,
  or,
  sql,
} from 'drizzle-orm'
import { RiskStudentDAO } from '../dao/RiskStudentDAO'
import {
  InsertOneRiskStudentsDTO,
  InsertRiskStudentsDTO,
} from '../dto/riskStudentDTO'
import {
  RiskStudentNotFoundError,
  SchedulewithoutProfessorError,
} from '../errors/RiskStudent.error'
import { Unit } from '@/interfaces/models/Unit'
import withPagination from '@/utils/withPagination'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { set } from 'zod'
class RiskStudentService implements RiskStudentDAO {
  public async getAllRiskStudentOfSpeciality({
    specialityId,
    q,
    page,
    limit,
    sortBy,
    eqnumber,
  }: {
    specialityId: Unit['id']
    q?: string
    page: number
    limit: number
    sortBy?: string
    eqnumber?: number
  }) {
    const professor = aliasedTable(accounts, 'professor')
    const student = aliasedTable(accounts, 'student')
    const [field, order] = sortBy?.split('.') || ['score', 'asc']

    const [{ total }] = await db
      .select({ total: sql<string>`count(*)` })
      .from(riskStudents)
      .innerJoin(student, eq(riskStudents.studentId, student.id))
      .innerJoin(schedules, eq(riskStudents.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(riskReasons, eq(riskStudents.reasonId, riskReasons.id))
      .innerJoin(
        scheduleAccounts,
        and(
          eq(schedules.id, scheduleAccounts.scheduleId),
          eq(scheduleAccounts.roleId, BaseRoles.PROFESSOR),
          eq(scheduleAccounts.lead, true)
        )
      )
      .innerJoin(professor, eq(scheduleAccounts.accountId, professor.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(
        and(
          eq(terms.current, true),
          eq(student.unitId, specialityId),
          or(
            ilike(student.code, `%${q}%`),
            sql`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname}) ilike ${`%${q}%`}`
          )
        )
      )
    const mappedFields = {
      ['score']: riskStudents.score,
      ['name']: student.name,
      ['surname']: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
      ['code']: student.code,
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }
    const riskStudentsResponseQuery = db
      .select({
        student: {
          code: student.code,
          name: student.name,
          surname: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
        },
        course: {
          code: courses.code,
          name: courses.name,
        },
        schedule: {
          id: schedules.id,
          code: schedules.code,
        },
        score: riskStudents.score,
        reason: riskReasons.description,
        state: riskStudents.updated,
      })
      .from(riskStudents)
      .innerJoin(student, eq(riskStudents.studentId, student.id))
      .innerJoin(schedules, eq(riskStudents.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(riskReasons, eq(riskStudents.reasonId, riskReasons.id))
      .innerJoin(
        scheduleAccounts,
        and(
          eq(schedules.id, scheduleAccounts.scheduleId),
          eq(scheduleAccounts.roleId, BaseRoles.PROFESSOR),
          eq(scheduleAccounts.lead, true)
        )
      )
      .innerJoin(professor, eq(scheduleAccounts.accountId, professor.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(
        and(
          eq(terms.current, true),
          eq(student.unitId, specialityId),
          eq(riskStudents.active, true),
          or(
            ilike(student.code, `%${q}%`),
            sql`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname}) ilike ${`%${q}%`}`
          ),
          eqnumber !== undefined && eqnumber !== 0
            ? eq(riskStudents.score, eqnumber)
            : sql`1 = 1`
        )
      )
      .$dynamic()

    const riskStudentsResponse = await withPagination(
      riskStudentsResponseQuery,
      mappedSortBy[order as keyof typeof mappedSortBy](
        mappedFields[field as keyof typeof mappedFields]
      ),
      page,
      limit
    )
    return {
      result: riskStudentsResponse,
      rowCount: +total,
      currentPage: page,
      totalPages: Math.ceil(+total / limit),
      hasNext: +total > (page + 1) * limit,
    }
  }

  public async getAllRiskStudentOfProfessor({
    professorId,
    q,
    page,
    limit,
    sortBy,
    eqnumber,
  }: {
    professorId: string
    q?: string
    page: number
    limit: number
    sortBy?: string
    eqnumber?: number
  }) {
    const professor = aliasedTable(accounts, 'professor')
    const student = aliasedTable(accounts, 'student')
    const [field, order] = sortBy?.split('.') || ['score', 'asc']
    const [{ total }] = await db
      .select({ total: sql<string>`count(*)` })
      .from(riskStudents)
      .innerJoin(student, eq(riskStudents.studentId, student.id))
      .innerJoin(schedules, eq(riskStudents.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(riskReasons, eq(riskStudents.reasonId, riskReasons.id))
      .innerJoin(
        scheduleAccounts,
        and(
          eq(schedules.id, scheduleAccounts.scheduleId),
          eq(scheduleAccounts.roleId, BaseRoles.PROFESSOR),
          eq(scheduleAccounts.lead, true)
        )
      )
      .innerJoin(professor, eq(scheduleAccounts.accountId, professor.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(
        and(
          eq(terms.current, true),
          eq(professor.id, professorId),
          eq(riskStudents.active, true),
          or(
            ilike(student.code, `%${q}%`),
            sql`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname}) ilike ${`%${q}%`}`
          )
        )
      )
    const mappedFields = {
      ['score']: riskStudents.score,
      ['name']: student.name,
      ['surname']: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
      ['code']: student.code,
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }
    const riskStudentsResponseQuery = db
      .select({
        student: {
          code: student.code,
          name: student.name,
          surname: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
        },
        course: {
          code: courses.code,
          name: courses.name,
        },
        schedule: {
          id: schedules.id,
          code: schedules.code,
        },
        score: riskStudents.score,
        reason: riskReasons.description,
        state: riskStudents.updated,
      })
      .from(riskStudents)
      .innerJoin(student, eq(riskStudents.studentId, student.id))
      .innerJoin(schedules, eq(riskStudents.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(riskReasons, eq(riskStudents.reasonId, riskReasons.id))
      .innerJoin(
        scheduleAccounts,
        and(
          eq(schedules.id, scheduleAccounts.scheduleId),
          eq(scheduleAccounts.roleId, BaseRoles.PROFESSOR),
          eq(scheduleAccounts.lead, true)
        )
      )
      .innerJoin(professor, eq(scheduleAccounts.accountId, professor.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(
        and(
          eq(riskStudents.active, true),
          eq(terms.current, true),
          eq(professor.id, professorId),
          or(
            ilike(student.code, `%${q}%`),
            sql`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname}) ilike ${`%${q}%`}`
          ),
          eqnumber !== undefined && eqnumber !== 0
            ? eq(riskStudents.score, eqnumber)
            : sql`1 = 1`
        )
      )
      .$dynamic()

    const riskStudentsResponse = await withPagination(
      riskStudentsResponseQuery,
      mappedSortBy[order as keyof typeof mappedSortBy](
        mappedFields[field as keyof typeof mappedFields]
      ),
      page,
      limit
    )
    return {
      result: riskStudentsResponse,
      rowCount: +total,
      currentPage: page,
      totalPages: Math.ceil(+total / limit),
      hasNext: +total > (page + 1) * limit,
    }
  }

  public async getRiskStudentDetail({
    scheduleId,
    studentCode,
  }: {
    scheduleId: number
    studentCode: string
  }) {
    const professor = aliasedTable(accounts, 'professor')
    const student = aliasedTable(accounts, 'student')
    const riskStudentResponse = await db
      .select({
        student: {
          code: student.code,
          name: student.name,
          surname: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
          email: student.email,
        },
        course: {
          code: courses.code,
          name: courses.name,
        },
        schedule: {
          id: schedules.id,
          code: schedules.code,
          professorName: professor.name,
          professorCode: professor.code,
          professorSurname: sql<string>`concat(${professor.firstSurname}, ' ', ${professor.secondSurname})`,
          professorEmail: professor.email,
        },
        score: riskStudents.score,
        reason: riskReasons.description,
        state: riskStudents.updated,
      })
      .from(riskStudents)
      .innerJoin(student, eq(riskStudents.studentId, student.id))
      .innerJoin(schedules, eq(riskStudents.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(riskReasons, eq(riskStudents.reasonId, riskReasons.id))
      .innerJoin(
        scheduleAccounts,
        and(
          eq(schedules.id, scheduleAccounts.scheduleId),
          eq(scheduleAccounts.roleId, BaseRoles.PROFESSOR),
          eq(scheduleAccounts.lead, true)
        )
      )
      .innerJoin(professor, eq(scheduleAccounts.accountId, professor.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(
        and(
          eq(schedules.id, scheduleId),
          eq(student.code, studentCode),
          eq(terms.current, true)
        )
      )
    if (riskStudentResponse.length === 0) {
      throw new RiskStudentNotFoundError('El alumno no está en riesgo')
    }
    const [selected] = riskStudentResponse
    return selected
  }

  public async getRiskStudentReports({
    scheduleId,
    studentCode,
  }: {
    scheduleId: number
    studentCode: string
  }) {
    const riskStudentReportsResponse = await db
      .select({
        id: riskStudentReports.id,
        date: riskStudentReports.date,
        score: riskStudentReports.score,
      })
      .from(riskStudentReports)
      .innerJoin(accounts, eq(riskStudentReports.studentId, accounts.id))
      .orderBy(desc(riskStudentReports.date))
      .where(
        and(
          eq(riskStudentReports.scheduleId, scheduleId),
          eq(accounts.code, studentCode)
        )
      )
    return riskStudentReportsResponse
  }

  public async insertRiskStudents(list: InsertRiskStudentsDTO['studentList']) {
    const scheduleCodes = Array.from(
      new Set(list.map((item) => item.scheduleCode))
    )
    const coursesCodes = Array.from(
      new Set(list.map((item) => item.courseCode))
    )
    const scheduleData = await db
      .select({
        scheduleId: schedules.id,
        scheduleCode: schedules.code,
        courseCode: courses.code,
      })
      .from(schedules)
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(terms, eq(schedules.termId, terms.id))
      .where(
        and(
          inArray(schedules.code, scheduleCodes),
          inArray(courses.code, coursesCodes),
          eq(terms.current, true)
        )
      )
    const mapCourseSchedule = new Map(
      scheduleData.map((item) => [
        `${item.courseCode}-${item.scheduleCode}`,
        item.scheduleId,
      ])
    )

    list.forEach((item) => {
      const key = `${item.courseCode}-${item.scheduleCode}`
      if (!mapCourseSchedule.has(key)) {
        throw new Error(
          `No se encontró el horario ${item.scheduleCode} del curso ${item.courseCode}`
        )
      }
    })
    const studentCodes = Array.from(
      new Set(list.map((item) => item.studentCode))
    )
    const studentsData = await db
      .select({
        studentId: accounts.id,
        studentCode: accounts.code,
      })
      .from(accounts)
      .where(inArray(accounts.code, studentCodes))

    const studentsMap = new Map(
      studentsData.map((item) => [item.studentCode, item.studentId])
    )

    const riskStudentData = list.map((item) => ({
      studentId: studentsMap.get(item.studentCode)!,
      scheduleId: mapCourseSchedule.get(
        `${item.courseCode}-${item.scheduleCode}`
      )!,
      reasonId: item.reasonId,
    }))

    const existingRiskStudents = await db
      .select({
        studentCode: accounts.code,
        studentId: accounts.id,
        scheduleId: riskStudents.scheduleId,
        active: riskStudents.active,
      })
      .from(riskStudents)
      .innerJoin(accounts, eq(riskStudents.studentId, accounts.id))
      .where(
        and(
          inArray(
            riskStudents.studentId,
            studentsData.map((item) => item.studentId)
          ),
          inArray(
            riskStudents.scheduleId,
            scheduleData.map((item) => item.scheduleId)
          )
        )
      )
    let existingStudentAlredyInserted: {
      studentId: string
      scheduleId: number
    }[]
    for (const item of existingRiskStudents) {
      if (!item.active) {
        existingStudentAlredyInserted = await db
          .update(riskStudents)
          .set({
            active: true,
          })
          .where(
            and(
              eq(riskStudents.studentId, item.studentId),
              eq(riskStudents.scheduleId, item.scheduleId)
            )
          )
          .returning({
            studentId: riskStudents.studentId,
            scheduleId: riskStudents.scheduleId,
          }) //regresamos la pk
      } else {
        throw new Error(
          `Los siguientes alumnos ya están en riesgo: ` +
            existingRiskStudents.map((item) => item.studentCode).join(', ')
        )
      }
    }

    if (existingRiskStudents.length > 0) {
    }

    const Profesorschedule = await db
      .select()
      .from(scheduleAccounts)
      .where(
        and(
          eq(scheduleAccounts.roleId, BaseRoles.PROFESSOR),
          eq(scheduleAccounts.lead, true)
        )
      )

    if (Profesorschedule.length === 0) {
      throw new SchedulewithoutProfessorError('No hay profesores en el horario')
    }

    const filteredRiskStudentData = riskStudentData.filter(
      (riskStudent) =>
        !existingStudentAlredyInserted.some(
          (existing) =>
            existing.studentId === riskStudent.studentId &&
            existing.scheduleId === riskStudent.scheduleId
        )
    )
    if (filteredRiskStudentData.length > 0)
      //si no hay datos no se inserta monito
      await db.insert(riskStudents).values(filteredRiskStudentData)
  }

  public async updateRiskStudentsOfFaculty({
    specialityId,
  }: {
    specialityId: Unit['id']
  }): Promise<void> {
    const isSpeciality = await db
      .select({
        count: sql<string>`count(*)`,
      })
      .from(units)
      .where(and(eq(units.id, specialityId), eq(units.type, 'speciality')))

    if (+isSpeciality[0].count === 0) {
      throw new Error('Su unidad no es una espcialidad')
    }

    const listStudents = await db
      .select({
        studentId: riskStudents.studentId,
      })
      .from(accounts)
      .innerJoin(riskStudents, eq(accounts.id, riskStudents.studentId))
      .where(
        and(
          eq(accounts.id, riskStudents.studentId),
          eq(accounts.unitId, specialityId),
          eq(riskStudents.active, true)
        )
      )
    if (listStudents.length === 0) {
      throw new Error('No hay alumnos en riesgo en su especialidad')
    }
    await db
      .update(riskStudents)
      .set({
        updated: false,
      })
      .where(
        inArray(
          riskStudents.studentId,
          listStudents.map((item) => item.studentId)
        )
      )
  }

  public async insertOneRiskStudents(student: InsertOneRiskStudentsDTO) {
    const scheduleCode = student.scheduleId
    const courseCode = student.courseId

    // Obtener datos del horario y curso
    const scheduleData = await db
      .select({
        scheduleId: schedules.id,
        scheduleCode: schedules.code,
        courseCode: courses.code,
      })
      .from(schedules)
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(terms, eq(schedules.termId, terms.id))
      .where(
        and(
          eq(schedules.id, scheduleCode),
          eq(courses.id, courseCode),
          eq(terms.current, true)
        )
      )

    if (scheduleData.length === 0) {
      throw new Error(
        `No se encontró el horario ${scheduleCode} del curso ${courseCode}`
      )
    }

    const scheduleId = scheduleData[0].scheduleId

    // Obtener datos del estudiante
    const studentCode = student.studentId
    const studentData = await db
      .select({
        studentId: accounts.id,
        studentCode: accounts.code,
      })
      .from(accounts)
      .where(eq(accounts.id, studentCode))

    if (studentData.length === 0) {
      throw new Error(`No se encontró el estudiante con código ${studentCode}`)
    }

    const studentId = studentData[0].studentId

    // Verificar si el estudiante ya está en riesgo
    const existingRiskStudent = await db
      .select({
        studentCode: accounts.code,
      })
      .from(riskStudents)
      .innerJoin(accounts, eq(riskStudents.studentId, accounts.id))
      .where(
        and(
          eq(riskStudents.studentId, studentId),
          eq(riskStudents.scheduleId, scheduleId)
        )
      )

    if (existingRiskStudent.length > 0) {
      throw new Error(
        `El estudiante ${studentCode} ya está en riesgo en el horario ${scheduleCode}`
      )
    }

    // Insertar el estudiante en riesgo
    const riskStudentData = {
      studentId,
      scheduleId,
      reasonId: student.reasonId,
    }

    await db.insert(riskStudents).values(riskStudentData)
  }

  public async getAllReasonForRiskStudent(): Promise<
    { id: number; name: string }[]
  > {
    const reasons = await db
      .select({
        id: riskReasons.id,
        name: riskReasons.description,
      })
      .from(riskReasons)

    return reasons
  }
}

export default RiskStudentService
