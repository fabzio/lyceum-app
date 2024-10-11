import db from '@/database'
import { accounts, enrollments, courses, schedules } from '@/database/schema'
import { aliasedTable, eq, sql } from 'drizzle-orm'
import { EnrollmentDAO } from '../dao/EnrollmentDAO'

class EnrollmentService implements EnrollmentDAO {
  public async getAllEnrollments() {
    const student = aliasedTable(accounts, 'student')

    const enrollmentsResponse = await db
      .select({
        requestNumber: enrollments.requestNumber,
        state: sql<string>`coalesce(${enrollments.state}, '')`,
        requestType: sql<string>`coalesce(${enrollments.requestType}, '')`,
        student: {
          name: student.name,
          surname: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
        },
        schedule: {
          code: schedules.code,
          course_name: courses.name,
        },
        reason: sql<string>`coalesce(${enrollments.reason}, '')`,
      })
      .from(enrollments)
      .innerJoin(student, eq(enrollments.studentId, student.id))
      .innerJoin(schedules, eq(enrollments.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
    //.where(eq(enrollments.active, true)) // Assuming there's an `active` field in `enrollments`

    return enrollmentsResponse
  }

  public async getEnrollmentRequest({ requestId }: { requestId: number }) {
    const student = aliasedTable(accounts, 'student')

    const enrollmentsResponse = await db
      .select({
        requestNumber: enrollments.requestNumber,
        state: sql<string>`coalesce(${enrollments.state}, '')`,
        requestType: sql<string>`coalesce(${enrollments.requestType}, '')`,
        student: {
          name: student.name,
          surname: sql<string>`concat(${student.firstSurname}, ' ', ${student.secondSurname})`,
        },
        schedule: {
          code: schedules.code,
          course_name: courses.name,
        },
        reason: sql<string>`coalesce(${enrollments.reason}, '')`,
      })
      .from(enrollments)
      .innerJoin(student, eq(enrollments.studentId, student.id))
      .innerJoin(schedules, eq(enrollments.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .where(eq(enrollments.requestNumber, requestId))
    return enrollmentsResponse
  }
}

export default EnrollmentService
