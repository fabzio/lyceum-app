import db from '@/database'
import {
  accounts,
  enrollmentModifications,
  courses,
  schedules,
  units,
  scheduleAccounts,
  terms,
} from '@/database/schema'
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
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'
import { EnrollmentModificationsSchema } from '@/database/schema/enrollmentModifications'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { Account } from '@/interfaces/models/Account'
import { Unit } from '@/interfaces/models/Unit'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'

class EnrollmentModificationService implements EnrollmentModificationDAO {
  public async getAllEnrollmentsOfSpeciality(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
    specialityId: Unit['id']
    eqnumber?: number
  }): Promise<
    PaginatedData<{
      student: {
        name: Account['name']
        surname: string
      }
      schedule: {
        code: string
        courseName: string
      }
      state: string
      requestType: string
      reason: string | null
      requestNumber: number
    }>
  > {
    const [field, order] = params.sortBy?.split('.') || ['requestNumber', 'asc']

    const isSpeciality = await db
      .select({ unitType: units.type })
      .from(units)
      .where(eq(units.id, params.specialityId))
    if (isSpeciality[0].unitType !== 'speciality') {
      throw new Error('No pertece a una especialidad')
    }

    const stateMap: { [key: number]: string | undefined } = {
      0: undefined, // Todos los estados
      1: 'requested',
      2: 'approved',
      3: 'denied',
    }

    // Obtener el total de registros según el filtro
    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(enrollmentModifications)
      .innerJoin(accounts, eq(enrollmentModifications.studentId, accounts.id))
      .innerJoin(
        schedules,
        eq(enrollmentModifications.scheduleId, schedules.id)
      )
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .where(
        and(
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${params.q}%`}`,
            ilike(courses.name, `%${params.q}%`)
          ),
          eq(accounts.unitId, params.specialityId),
          params.eqnumber !== undefined
            ? stateMap[params.eqnumber] !== undefined
              ? eq(
                  enrollmentModifications.state,
                  stateMap[params.eqnumber] as
                    | 'requested'
                    | 'approved'
                    | 'denied'
                )
              : sql<boolean>`true`
            : sql<boolean>`true` // No aplicar filtro de estado si no está definido
        )
      )

    // Mapeo de campos para ordenación
    const mappedFields = {
      ['requestNumber']: enrollmentModifications.requestNumber,
      ['name']: accounts.name,
    }

    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }

    const enrollmentsResponse = await db
      .select({
        requestNumber: sql<number>`coalesce(${enrollmentModifications.requestNumber}, 0)`,
        state: enrollmentModifications.state,
        requestType: enrollmentModifications.requestType,
        student: {
          name: accounts.name,
          surname: sql<string>`concat(${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
        },
        schedule: {
          code: schedules.code,
          courseName: courses.name,
        },
        reason: enrollmentModifications.reason,
      })
      .from(enrollmentModifications)
      .innerJoin(accounts, eq(enrollmentModifications.studentId, accounts.id))
      .innerJoin(
        schedules,
        eq(enrollmentModifications.scheduleId, schedules.id)
      )
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )
      .where(
        and(
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${params.q}%`}`,
            ilike(courses.name, `%${params.q}%`)
          ),
          eq(accounts.state, 'active'),
          params.eqnumber !== undefined
            ? stateMap[params.eqnumber] !== undefined
              ? eq(
                  enrollmentModifications.state,
                  stateMap[params.eqnumber] as
                    | 'requested'
                    | 'approved'
                    | 'denied'
                )
              : sql<boolean>`true`
            : sql<boolean>`true` // No aplicar filtro de estado si no está definido
        )
      )
    const result = enrollmentsResponse.map((enrollment) => ({
      requestNumber: enrollment.requestNumber,
      state: enrollment.state,
      requestType: enrollment.requestType,
      student: enrollment.student,
      schedule: enrollment.schedule,
      reason: enrollment.reason,
    }))

    return {
      result,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
      hasNext: +total > (params.page + 1) * params.limit,
    }
  }

  public async getEnrollmentRequest({
    requestNumber,
  }: {
    requestNumber: number
  }) {
    const student = aliasedTable(accounts, 'student')
    const faculty = aliasedTable(units, 'faculty')
    //FIXME: Se rompe si el unitId no es de una especialidad
    const response = await db
      .select({
        requestNumber: sql<number>`coalesce(${enrollmentModifications.requestNumber}, 0)`,
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
    //TODO: Agregar error personalizado
    if (response.length === 0) {
      throw new Error('No se encontró la solicitud')
    }
    return response[0]
  }

  public async updateEnrollmentRequestResponse({
    requestNumber,
    state,
    observation,
  }: Pick<
    EnrollmentModificationsSchema,
    'requestNumber' | 'state' | 'observation'
  >) {
    await db.transaction(async (trx) => {
      // 1. Obtén la solicitud de inscripción para verificar su tipo de solicitud
      const [enrollment] = await trx
        .select({
          studentId: enrollmentModifications.studentId,
          scheduleId: enrollmentModifications.scheduleId,
          requestType: enrollmentModifications.requestType,
        })
        .from(enrollmentModifications)
        .where(eq(enrollmentModifications.requestNumber, requestNumber ?? 0))

      if (!enrollment) {
        throw new Error(
          `No se encontró una solicitud con número ${requestNumber}`
        )
      }

      // 2. Actualiza el estado de la solicitud
      await trx
        .update(enrollmentModifications)
        .set({ state, observation })
        .where(eq(enrollmentModifications.requestNumber, requestNumber ?? 0))

      // 3. Condicional para inserción o eliminación en `scheduleAccounts`
      if (state === 'approved') {
        if (enrollment.requestType === 'aditional') {
          // Si es solicitud adicional, insertar en `scheduleAccounts`
          await trx.insert(scheduleAccounts).values({
            scheduleId: enrollment.scheduleId,
            accountId: enrollment.studentId,
            roleId: BaseRoles.STUDENT,
            lead: false,
          })
        } else if (enrollment.requestType === 'withdrawal') {
          // Si es solicitud de retiro, eliminar de `scheduleAccounts` si existe
          await trx
            .delete(scheduleAccounts)
            .where(
              and(
                eq(scheduleAccounts.scheduleId, enrollment.scheduleId),
                eq(scheduleAccounts.accountId, enrollment.studentId)
              )
            )
        }
      }
    })
  }
  public async createEnrollmentRequest({
    reason,
    requestType,
    scheduleId,
    studentId,
  }: Omit<EnrollmentModificationsSchema, 'requestNumber'>) {
    const unitTypeOfStudent = await db
      .select({
        unitType: units.type,
      })
      .from(units)
      .innerJoin(accounts, eq(accounts.unitId, units.id))
      .where(eq(accounts.id, studentId))
    if (unitTypeOfStudent[0].unitType !== 'speciality') {
      throw new Error('El estudiante no pertenece a una especialidad')
    }

    const pendingEnrollment = await db
      .select({
        count: sql<string>`count(*)`,
      })
      .from(enrollmentModifications)
      .where(
        and(
          eq(enrollmentModifications.studentId, studentId),
          eq(enrollmentModifications.scheduleId, scheduleId),
          eq(enrollmentModifications.state, 'requested')
        )
      )
    if (+pendingEnrollment[0].count > 0) {
      throw new Error('Ya existe una solicitud pendiente para este horario')
    }
    const nestedSchedule = aliasedTable(schedules, 'nestedSchedule')

    const existingStudentInCourse = await db
      .select()
      .from(scheduleAccounts)
      .innerJoin(schedules, eq(scheduleAccounts.scheduleId, schedules.id))
      .innerJoin(terms, eq(schedules.termId, terms.id))
      .where(
        and(
          eq(scheduleAccounts.accountId, studentId),
          inArray(
            schedules.courseId,
            db
              .select({
                courseId: nestedSchedule.courseId,
              })
              .from(nestedSchedule)
              .where(eq(nestedSchedule.id, scheduleId))
          )
        )
      )

    //TODO: Crear error personalizado
    if (requestType === 'aditional' && existingStudentInCourse.length > 0) {
      throw new Error('El estudiante ya está inscrito en el curso')
    }
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
      newCode = (lastCode[0]?.requestNumber ?? 0) + 1
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

  public async getStudentEnrollments({
    studentId,
    q,
    page,
    limit,
    sortBy,
    eqnumber,
  }: {
    studentId: Account['id']
    q?: string
    page: number
    limit: number
    sortBy?: string
    eqnumber?: number
  }): Promise<
    PaginatedData<{
      student: {
        name: Account['name']
        surname: string
      }
      schedule: {
        code: string
        courseName: string
      }
      state: string
      requestType: string
      reason: string | null
      requestNumber: number
      observation: string | null
    }>
  > {
    const [field, order] = sortBy?.split('.') || ['requestNumber', 'asc']

    const stateMap: { [key: number]: string | undefined } = {
      0: undefined, // Todos los estados
      1: 'requested',
      2: 'approved',
      3: 'denied',
    }

    // Obtener el total de registros según el filtro
    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(enrollmentModifications)
      .innerJoin(
        schedules,
        eq(enrollmentModifications.scheduleId, schedules.id)
      )
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .where(
        and(
          or(ilike(courses.name, `%${q}%`)),
          eq(enrollmentModifications.studentId, studentId),
          eqnumber !== undefined
            ? stateMap[eqnumber] !== undefined
              ? eq(
                  enrollmentModifications.state,
                  stateMap[eqnumber] as 'requested' | 'approved' | 'denied'
                )
              : sql<boolean>`true`
            : sql<boolean>`true` // No aplicar filtro de estado si no está definido
        )
      )

    // Mapeo de campos para ordenación
    const mappedFields = {
      ['requestNumber']: enrollmentModifications.requestNumber,
      ['name']: courses.name,
    }

    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }

    const enrollmentsResponse = await db
      .select({
        requestNumber: sql<number>`coalesce(${enrollmentModifications.requestNumber}, 0)`,
        state: enrollmentModifications.state,
        requestType: enrollmentModifications.requestType,
        student: {
          name: accounts.name,
          surname: sql<string>`concat(${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
        },
        schedule: {
          code: schedules.code,
          courseName: courses.name,
        },
        reason: enrollmentModifications.reason,
        observation: enrollmentModifications.observation,
      })
      .from(enrollmentModifications)
      .innerJoin(accounts, eq(enrollmentModifications.studentId, accounts.id))
      .innerJoin(
        schedules,
        eq(enrollmentModifications.scheduleId, schedules.id)
      )
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .where(
        and(
          or(ilike(courses.name, `%${q}%`)),
          eq(enrollmentModifications.studentId, studentId),
          eqnumber !== undefined
            ? stateMap[eqnumber] !== undefined
              ? eq(
                  enrollmentModifications.state,
                  stateMap[eqnumber] as 'requested' | 'approved' | 'denied'
                )
              : sql<boolean>`true`
            : sql<boolean>`true` // No aplicar filtro de estado si no está definido
        )
      )
      .offset(page * limit)
      .limit(limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )

    return {
      result: enrollmentsResponse,
      rowCount: +total,
      currentPage: page,
      totalPages: Math.ceil(+total / limit),
      hasNext: +total > page + 1 * limit,
    }
  }
}

export default EnrollmentModificationService
