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
import { aliasedTable, and, desc, eq, inArray, sql } from 'drizzle-orm'
import { RiskStudentDAO } from '../dao/RiskStudentDAO'
import { InsertRiskStudentsDTO } from '../dto/riskStudentDTO'
import { RiskStudentNotFoundError } from '../errors/RiskStudent.error'
import { Unit } from '@/interfaces/models/Unit'
class RiskStudentService implements RiskStudentDAO {
  public async getAllRiskStudent() {
    const professor = aliasedTable(accounts, 'professor')
    const student = aliasedTable(accounts, 'student')
    const riskStudentsResponse = await db
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
      .where(eq(terms.current, true))

    return {
      result: riskStudentsResponse,
      rowCount: riskStudentsResponse.length,
      currentPage: 1,
      totalPages: 1,
      hasNext: false,
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
    const schedulesCoursesData = await db
      .select({
        scheduleId: schedules.id,
        scheduleCode: schedules.code,
        courseCode: courses.code,
      })
      .from(schedules)
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(eq(terms.current, true))

    const scheduleIds = list.map((item) => {
      const schedule = schedulesCoursesData.find(
        (data) =>
          data.courseCode === item.courseCode &&
          data.scheduleCode === item.scheduleCode
      )
      if (!schedule) {
        throw new Error('Schedule not found')
      }
      return schedule.scheduleId
    })

    const studentsData = await db
      .select({
        studentId: accounts.id,
        studentCode: accounts.code,
      })
      .from(accounts)
      .where(
        inArray(
          accounts.code,
          list.map((item) => item.studentCode)
        )
      )
    const studentsMap = new Map(
      studentsData.map((item) => [item.studentCode, item.studentId])
    )

    const riskStudentData = list.map((item, idx) => ({
      studentId: studentsMap.get(item.studentCode)!,
      scheduleId: scheduleIds[idx],
      score: item.score,
      reasonId: item.reasonId,
    }))

    await db.insert(riskStudents).values(riskStudentData)
  }
  public async updateRiskStudentsOfFaculty({
    facultyId,
  }: {
    facultyId: Unit['id']
  }): Promise<void> {
    const isFaculty = await db
      .select({
        count: sql<string>`count(*)`,
      })
      .from(units)
      .where(and(eq(units.id, facultyId), eq(units.type, 'faculty')))

    if (+isFaculty[0].count === 0) {
      throw new Error('Su unidad no es una facultad')
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
          eq(accounts.unitId, facultyId)
        )
      )
    if (listStudents.length === 0) {
      throw new Error('No hay alumnos en riesgo en su facultad')
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
}

export default RiskStudentService
