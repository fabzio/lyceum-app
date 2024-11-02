import db from '@/database'
import {
  accounts,
  enrollmentModifications,
  courses,
  schedules,
  units,
} from '@/database/schema'
import { aliasedTable, eq, sql } from 'drizzle-orm'
import { EnrollmentModificationDAO } from '../dao/enrollmentModificationDAO'
import { EnrollmentModificationsSchema } from '@/database/schema/enrollmentModifications'

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
    const faculty = aliasedTable(units, 'faculty')
    const [enrollmentsResponse] = await db
      .select({
        requestNumber: enrollmentModifications.requestNumber,
        state: enrollmentModifications.state,
        requestType: enrollmentModifications.requestType,
        student: {
          name: sql<string>`concat(${student.name}, ' ', ${student.firstSurname}, ' ', ${student.secondSurname})`,
          code: student.code,
          speciality: units.name,
          faculty: faculty.name,
        },
        schedule: {
          code: schedules.code,
          courseCode: courses.code,
          courseName: courses.name,
        },
        reason: enrollmentModifications.reason,
      })
      .from(enrollmentModifications)
      .innerJoin(student, eq(enrollmentModifications.studentId, student.id))
      .innerJoin(units, eq(student.unitId, units.id))
      .innerJoin(faculty, eq(units.parentId, faculty.id))
      .innerJoin(
        schedules,
        eq(enrollmentModifications.scheduleId, schedules.id)
      )
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .where(eq(enrollmentModifications.requestNumber, requestNumber))
    return enrollmentsResponse
  }

  public async updateEnrollmentRequestResponse({
    requestNumber,
    state,
  }: Pick<EnrollmentModificationsSchema, 'requestNumber' | 'state'>) {
    await db
      .update(enrollmentModifications)
      .set({
        state,
      })
      .where(eq(enrollmentModifications.requestNumber, requestNumber))
  }
}

export default EnrollmentModificationService
