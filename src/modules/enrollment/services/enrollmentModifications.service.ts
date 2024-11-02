import db from '@/database'
import {
  accounts,
  enrollmentModifications,
  courses,
  schedules,
  units,
  terms,
} from '@/database/schema'
import { aliasedTable, desc, eq, sql } from 'drizzle-orm'
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'
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
  public async createEnrollmentRequest({
    reason,
    requestType,
    scheduleId,
    studentId,
  }: Omit<EnrollmentModificationsSchema, 'requestNumber' | ''>) {
    const currentTerm = await db
      .select({
        termId: terms.name,
      })
      .from(terms)
      .where(eq(terms.current, true))
    if (!currentTerm) {
      throw new Error('No current term found')
    }
    const lastCode = await db
      .select({
        requestNumber: enrollmentModifications.requestNumber,
      })
      .from(enrollmentModifications)
      .orderBy(desc(enrollmentModifications.requestNumber))
      .limit(1)

    const [year, term] = currentTerm[0].termId.split('-')
    let newCode: number
    if (lastCode.length === 0) {
      newCode = parseInt(`${year}${term}0000`)
    } else {
      newCode = lastCode[0].requestNumber + 1
    }

    await db.insert(enrollmentModifications).values({
      requestNumber: newCode,
      reason,
      requestType,
      scheduleId,
      studentId,
    })

    return newCode
  }
}

export default EnrollmentModificationService
