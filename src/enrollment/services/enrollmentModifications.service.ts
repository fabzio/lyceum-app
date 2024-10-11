import db from '@/database'
import {
  accounts,
  enrollmentModifications,
  courses,
  schedules,
} from '@/database/schema'
import { aliasedTable, eq, sql } from 'drizzle-orm'
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'

class EnrollmentModificationService implements EnrollmentModificationDAO {
  public async getAllEnrollments() {
    const student = aliasedTable(accounts, 'student')

    const enrollmentsResponse = await db
      .select({
        requestNumber: enrollmentModifications.requestNumber,
        state: enrollmentModifications.state,
        requestType: enrollmentModifications.requestType,
        student: {
          name: student.name,
          surname: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
        },
        schedule: {
          code: schedules.code,
          courseName: courses.name,
        },
        reason: enrollmentModifications.reason,
      })
      .from(enrollmentModifications)
      .innerJoin(student, eq(enrollmentModifications.studentId, student.id))
      .innerJoin(
        schedules,
        eq(enrollmentModifications.scheduleId, schedules.id)
      )
      .innerJoin(courses, eq(schedules.courseId, courses.id))

    return enrollmentsResponse
  }

  public async getEnrollmentRequest({
    requestNumber,
  }: {
    requestNumber: number
  }) {
    const student = aliasedTable(accounts, 'student')

    const enrollmentsResponse = await db
      .select({
        requestNumber: enrollmentModifications.requestNumber,
        state: enrollmentModifications.state,
        requestType: enrollmentModifications.requestType,
        student: {
          name: student.name,
          surname: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
        },
        schedule: {
          code: schedules.code,
          courseName: courses.name,
        },
        reason: enrollmentModifications.reason,
      })
      .from(enrollmentModifications)
      .innerJoin(student, eq(enrollmentModifications.studentId, student.id))
      .innerJoin(
        schedules,
        eq(enrollmentModifications.scheduleId, schedules.id)
      )
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .where(eq(enrollmentModifications.requestNumber, requestNumber))
    return enrollmentsResponse
  }
}

export default EnrollmentModificationService
