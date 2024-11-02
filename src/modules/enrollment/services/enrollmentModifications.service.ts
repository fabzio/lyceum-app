import db from '@/database'
import {
  accounts,
  enrollmentModifications,
  courses,
  schedules,
  units,
  scheduleAccounts,
} from '@/database/schema'
import { aliasedTable, and, asc, desc, eq, ilike, sql } from 'drizzle-orm'
import { EnrollmentModificationDAO } from '../dao/EnrollmentModificationDAO'
import { EnrollmentModificationsSchema } from '@/database/schema/enrollmentModifications'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { Account } from '@/interfaces/models/Account'

class EnrollmentModificationService implements EnrollmentModificationDAO {

  public async createEnrollmentModification(
    _studentId: string,
    _scheduleId: number,
    _state: 'requested' | 'approved' | 'denied',
    _requestType: 'aditional' | 'withdrawal',
    _reason?: string
  ): Promise<void> {
    // Insertamos los datos en la base de datos
    await db.insert(enrollmentModifications).values({
      studentId: _studentId,
      scheduleId: _scheduleId,
      state: _state,
      requestType: _requestType,
      reason: _reason || null, // Se establece como null si no se proporciona
      date: new Date(),
    });
  }

  public async getAllEnrollments(params: {
    q?: string;
    page: number;
    limit: number;
    sortBy?: string;
  }): Promise<PaginatedData<{
    student: {
      name: Account['name'];
      surname: string;
    };
    schedule: {
      code: string;
      courseName: string;
    };
    state: string;
    requestType: string;
    reason: string | null;
    requestNumber: number;
  }
  >> {
    const [field, order] = params.sortBy?.split('.') || ['requestNumber', 'asc'];
  
    // Obtener el total de registros según el filtro
    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(enrollmentModifications)
      .innerJoin(accounts, eq(enrollmentModifications.studentId, accounts.id))
      .where(
        params.q
          ? ilike(accounts.name, `%${params.q}%`)
          : sql<boolean>`true` // Condición siempre verdadera si no hay búsqueda
      );
  
    // Mapeo de campos para ordenación
    const mappedFields = {
      ['requestNumber']: enrollmentModifications.requestNumber,
      ['name']: accounts.name,
    };
  
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    };

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
      .innerJoin(schedules, eq(enrollmentModifications.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      );
      const result = enrollmentsResponse.map((enrollment) => ({
        requestNumber: enrollment.requestNumber,
        state: enrollment.state,
        requestType: enrollment.requestType,
        student: enrollment.student,
        schedule: enrollment.schedule,
        reason: enrollment.reason,
      }));
    
      return {
        result,
        rowCount: +total,
        currentPage: params.page,
        totalPages: Math.ceil(+total / params.limit),
        hasNext: +total > (params.page + 1) * params.limit,
      };
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
      .where(eq(enrollmentModifications.requestNumber, requestNumber ?? 0))
    return enrollmentsResponse
  }

  public async updateEnrollmentRequestResponse({
    requestNumber,
    state,
  }: Pick<EnrollmentModificationsSchema, 'requestNumber' | 'state'>) {
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
        throw new Error(`No se encontró una solicitud con número ${requestNumber}`)
      }
  
      // 2. Actualiza el estado de la solicitud
      await trx
        .update(enrollmentModifications)
        .set({ state })
        .where(eq(enrollmentModifications.requestNumber, requestNumber ?? 0))
  
      // 3. Condicional para inserción o eliminación en `scheduleAccounts`
      if (state === 'approved') {
        if (enrollment.requestType === 'aditional') {
          // Si es solicitud adicional, insertar en `scheduleAccounts`
          await trx.insert(scheduleAccounts).values({
            scheduleId: enrollment.scheduleId,
            accountId: enrollment.studentId,
            roleId: 2, // Rol fijo de estudiante
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
  
    console.log(`Solicitud con número ${requestNumber} actualizada a estado ${state}`)
  }
}

export default EnrollmentModificationService
