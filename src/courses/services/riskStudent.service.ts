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
} from '@/database/schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { aliasedTable, and, desc, eq, inArray, sql } from 'drizzle-orm'
import { RiskStudentDAO } from '../dao/RiskStudentDAO'
import {
  InsertRiskStudentsDTO,
} from '../dto/riskStudentDTO'
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
          email: student.email,
        },
        course: {
          code: courses.code,
          name: courses.name,
        },
        schedule: {
          id: schedules.id,
          code: schedules.code,
          professor: sql<string>`concat(${professor.name}, ' ', ${professor.firstSurname}, ' ', ${professor.secondSurname})`,
        },
        score: riskStudents.score,
        reason: riskReasons.description,
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

    return riskStudentsResponse
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
      studentId: studentsMap.get(item.studentCode),
      scheduleId: scheduleIds[idx],
      score: item.score,
      reasonId: item.reasonId,
    }))

    await db.insert(riskStudents).values(riskStudentData)
  }
  public async updateRiskStudents(): Promise<void> {
    await db.update(riskStudents).set({
      updated: false,
    })
  }
}

export default RiskStudentService
