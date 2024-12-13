import db from '@/database'
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
import {
  units,
  accounts,
  scheduleAccounts,
  schedules,
  courses,
  terms,
} from '@/database/schema'
import { Unit } from '@/interfaces/models/Unit'
import withPagination from '@/utils/withPagination'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { StudentLeadDAO } from '../dao/StudentsLeadsDAO'
class StudentLeadsService implements StudentLeadDAO {
  public async getAllStudentLeadsOfSpeciality({
    specialityId,
    q,
    page,
    limit,
    sortBy,
    idTerm,
  }: {
    specialityId: Unit['id']
    q?: string
    page: number
    limit: number
    sortBy?: string
    idTerm?: number
  }) {
    const student = aliasedTable(accounts, 'student')
    const [field, order] = sortBy?.split('.') || ['studentFullName', 'asc']

    const [{ total }] = await db
      .select({ total: sql<string>`count(*)` })
      .from(scheduleAccounts)
      .innerJoin(student, eq(scheduleAccounts.accountId, student.id))
      .innerJoin(schedules, eq(scheduleAccounts.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(
        and(
          eq(terms.current, true),
          eq(student.unitId, specialityId),
          eq(scheduleAccounts.lead, true),
          eq(scheduleAccounts.roleId, BaseRoles.STUDENT),
          idTerm ? eq(terms.id, +idTerm) : sql`true`,
          or(
            ilike(student.code, `%${q}%`),
            sql`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname}) ilike ${`%${q}%`}`
          )
        )
      )

    const mappedFields = {
      ['studentFullName']: sql<string>`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname})`,
      ['studentCode']: student.code,
      ['courseName']: courses.name,
      ['courseCode']: courses.code,
      ['scheduleCode']: schedules.code,
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }

    const studentLeadsResponseQuery = db
      .select({
        studentId: student.id,
        studentFullName: sql<string>`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname})`,
        studentCode: student.code,
        courseId: courses.id,
        courseName: courses.name,
        courseCode: courses.code,
        scheduleId: schedules.id,
        scheduleCode: schedules.code,
      })
      .from(scheduleAccounts)
      .innerJoin(student, eq(scheduleAccounts.accountId, student.id))
      .innerJoin(schedules, eq(scheduleAccounts.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(terms, eq(terms.id, schedules.termId))
      .where(
        and(
          eq(terms.current, true),
          eq(student.unitId, specialityId),
          eq(scheduleAccounts.lead, true),
          eq(scheduleAccounts.roleId, BaseRoles.STUDENT),
          idTerm ? eq(terms.id, +idTerm) : sql`true`,
          or(
            ilike(student.code, `%${q}%`),
            sql`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname}) ilike ${`%${q}%`}`
          )
        )
      )
      .$dynamic()

    const studentLeadsResponse = await withPagination(
      studentLeadsResponseQuery,
      mappedSortBy[order as keyof typeof mappedSortBy](
        mappedFields[field as keyof typeof mappedFields]
      ),
      page,
      limit
    )

    return {
      result: studentLeadsResponse,
      rowCount: +total,
      currentPage: page,
      totalPages: Math.ceil(+total / limit),
      hasNext: +total > (page + 1) * limit,
    }
  }
}
export default StudentLeadsService
