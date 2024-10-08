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
import { aliasedTable, and, desc, eq, sql } from 'drizzle-orm'
import { RiskStudentDAO } from '../dao/RiskStudentDAO'
class RiskStudentService implements RiskStudentDAO{
  public getAllRiskStudent() {
    const professor = aliasedTable(accounts, 'professor')
    const student = aliasedTable(accounts, 'student')
    const riskStudentsResponse = db
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

  public getRiskStudentReports({
    scheduleId,
    studentCode,
  }: {
    scheduleId: number
    studentCode: string
  }) {
    const riskStudentReportsResponse = db
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
}

export default RiskStudentService
