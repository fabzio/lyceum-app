import db from '@/database'
import {
  courses,
  enrollmentProposal,
  enrollmentProposalCourses,
  terms,
  units,
} from '@/database/schema'
import { and, eq, inArray, desc, sql, asc } from 'drizzle-orm'
import {
  RepeatedCoursesError,
  NoCoursesSendedError,
  EnrollmentProposalNotFoundError,
  CourseAlreadyAddedError,
  InvalidStatusChangeError,
} from '../errors'
import Enrollment from '..'
import { ScheduleProposalDAO } from '../dao'
import { error } from 'console'
import { any } from 'zod'
import { Proposal } from '@/interfaces/models/Proposal'
import { PaginatedData } from '@/interfaces/PaginatedData'

class ScheduleProposalService implements ScheduleProposalDAO {
  public async insertCourseToScheduleProposal(
    enrollmentProposalId: number,
    coursesList: {
      courseId: number
      vacanciesPerSchema: number
      visibleSchedules: number
      hiddenSchedules: number
    }[]
  ) {
    //Validación 1 - Los cursos a insertar en la propuesta no se deben repetir
    const courseIdSet = new Set<number>()
    for (const course of coursesList) {
      if (courseIdSet.has(course.courseId)) {
        throw new RepeatedCoursesError(
          `El curso con ID ${course.courseId} está duplicado en la lista de cursos`
        )
      }
      courseIdSet.add(course.courseId)
    }

    //Validación 2 - La propuesta de horarios debe existir
    const existingEnrollmentProposal = await db
      .select()
      .from(enrollmentProposal)
      .where(eq(enrollmentProposal.id, enrollmentProposalId))
    if (existingEnrollmentProposal.length === 0) {
      throw new EnrollmentProposalNotFoundError(
        'La propuesta de horario no ha sido encontrada'
      )
    }

    //Validación 3 - Los cursos a agregar a la propuesta no deben ser cero
    if (coursesList.length === 0) {
      throw new NoCoursesSendedError(
        'Se envió una propuesta de horario sin cursos'
      )
    }

    //Validación 4 - Verificamos que los cursos que vamos a agregar a la propuesta
    //ya no han sido agregados antes
    const existingEnrollmentProposalCourses = await db
      .select()
      .from(enrollmentProposalCourses)
      .where(
        inArray(
          enrollmentProposalCourses.courseId,
          coursesList.map((course) => course.courseId)
        )
      )
    if (existingEnrollmentProposalCourses.length > 0) {
      throw new CourseAlreadyAddedError(
        'Alguno de los cursos que se quiere agregar ya ha sido agregado'
      )
    }

    //Ahora sí insertamos los cursos a la tabla :)
    await db.insert(enrollmentProposalCourses).values(
      coursesList.map((course) => ({
        enrollmentProposalId,
        courseId: course.courseId,
        vacanciesPerSchema: course.vacanciesPerSchema,
        visibleSchedules: course.visibleSchedules,
        hiddenSchedules: course.hiddenSchedules,
      }))
    )
  }

  public async updateScheduleProposalStatus(
    enrollmentProposalId: number,
    newStatus: 'requested' | 'sended' | 'aproved' | 'assigned'
  ): Promise<void> {
    // 1. Obtener el estado actual de la propuesta
    const [existingProposal] = await db
      .select({ state: enrollmentProposal.state })
      .from(enrollmentProposal)
      .where(eq(enrollmentProposal.id, enrollmentProposalId))

    if (!existingProposal) {
      throw new EnrollmentProposalNotFoundError(
        'La propuesta de inscripción no existe'
      )
    }

    // 2. Validar el cambio de estado
    const validTransitions = {
      requested: 'sended',
      sended: 'aproved',
      aproved: 'assigned',
      assigned: null,
    }

    const currentState = existingProposal.state
    if (!(validTransitions[currentState] === newStatus)) {
      throw new InvalidStatusChangeError(
        `No se puede cambiar el estado de ${currentState} a ${newStatus}`
      )
    }

    // 3. Actualizar el estado si es válido
    await db
      .update(enrollmentProposal)
      .set({ state: newStatus })
      .where(eq(enrollmentProposal.id, enrollmentProposalId))
  }

  public async insertScheduleProposal(
    facultyId: number,
    accountId: string,
    termId: number
  ) {
    //validacion 1: la facultad debe existir
    const existingFaculty = await db
      .select()
      .from(units)
      .where(and(eq(units.id, facultyId), eq(units.type, 'faculty')))
    if (existingFaculty.length === 0) {
      throw new Error('La facultad no existe')
    }

    //validacion 2: el termId es valido
    const currentTerm = await db
      .select()
      .from(terms)
      .where(eq(terms.id, termId))
    if (currentTerm.length === 0) {
      //TODO: Encontrar la forma de validar que la fecha de creacion de la propuesta esté dentro del ciclo vigente
      throw new Error(
        'No se puede solicitar una propuesta fuera del ciclo vigente'
      )
    }

    //validación 3: la facultad debe tener al menos una especialidad
    const existingSpecialties = await db
      .select()
      .from(units)
      .where(eq(units.parentId, facultyId))
    if (existingSpecialties.length === 0) {
      throw new Error('La facultad no tiene especialidades')
    }

    //validación 4: la propuesta no debe existir
    const existingProposal = await db
      .select()
      .from(enrollmentProposal)
      .where(
        and(
          inArray(
            enrollmentProposal.specialityId,
            existingSpecialties.map((specialitie) => specialitie.id)
          ),
          eq(enrollmentProposal.termId, termId)
        )
      )
    if (existingProposal.length > 0) {
      throw new Error('La propuesta ya existe')
    }

    //insertamos la propuesta
    await db.insert(enrollmentProposal).values(
      existingSpecialties.map((specialitie) => ({
        specialityId: specialitie.id,
        accountId: accountId,
        termId: termId,
      }))
    )
  }
  public async getScheduleProposalsInUnit(params: {
    unitId: number
    page: number
    limit: number
    sortBy?: string
  }): Promise<
    PaginatedData<{
      id: number
      speciality: {
        id: number
        name: string
      }
      termId: number
      state: 'requested' | 'sended' | 'aproved' | 'assigned'
      createdAt: Date | null
    }>
  > {
    const { unitId, page, limit, sortBy } = params
    const [field, order] = sortBy?.split('.') || ['createdAt', 'asc']

    // Validación 1 - La unidad debe existir
    const existingUnit = await db
      .select({ type: units.type })
      .from(units)
      .where(eq(units.id, unitId))
    if (existingUnit.length === 0) {
      throw new Error('La unidad no existe')
    }

    // Configuración de campos de ordenamiento
    const mappedFields = {
      ['createdAt']: enrollmentProposal.createdAt,
      ['state']: enrollmentProposal.state,
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }

    // Definir condiciones para facultad y especialidad
    const condition =
      existingUnit[0].type === 'faculty'
        ? inArray(
            enrollmentProposal.specialityId,
            (
              await db
                .select({ id: units.id })
                .from(units)
                .where(eq(units.parentId, unitId))
            ).map((speciality) => speciality.id)
          )
        : eq(enrollmentProposal.specialityId, unitId)

    // Contar total de propuestas para paginación
    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(enrollmentProposal)
      .where(condition)

    // Obtener las propuestas de horario con paginación y ordenamiento
    const proposals = await db
      .select({
        id: enrollmentProposal.id,
        speciality: {
          id: units.id,
          name: units.name,
        },
        termId: enrollmentProposal.termId,
        state: enrollmentProposal.state,
        createdAt: enrollmentProposal.createdAt,
      })
      .from(enrollmentProposal)
      .innerJoin(units, eq(enrollmentProposal.specialityId, units.id))
      .where(condition)
      .offset(page * limit)
      .limit(limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )

    return {
      result: proposals,
      rowCount: +total,
      currentPage: page,
      totalPages: Math.ceil(+total / limit),
      hasNext: +total > (page + 1) * limit,
    }
  }

  public async updateCoursesInScheduleProposal(
    enrollmentProposalId: number,
    coursesList: {
      courseId: number
      vacanciesPerSchema: number
      visibleSchedules: number
      hiddenSchedules: number
    }[]
  ) {
    //Validación 1 - La propuesta de horarios debe existir
    const existingEnrollmentProposal = await db
      .select()
      .from(enrollmentProposal)
      .where(eq(enrollmentProposal.id, enrollmentProposalId))
    if (existingEnrollmentProposal.length === 0) {
      throw new EnrollmentProposalNotFoundError(
        'La propuesta de horario no ha sido encontrada'
      )
    }

    //Validación 2 - Los cursos en la lista no se deben repetir
    const courseIdSet = new Set<number>()
    for (const course of coursesList) {
      if (courseIdSet.has(course.courseId)) {
        throw new RepeatedCoursesError(
          `El curso con ID ${course.courseId} está duplicado en la lista de cursos`
        )
      }
      courseIdSet.add(course.courseId)
    }

    //Ahora sí actualizamos los cursos en la tabla :)
    await db.transaction(async (trx) => {
      const updatePromises = coursesList.map((course) =>
        trx
          .update(enrollmentProposalCourses)
          .set({
            vacanciesPerSchema: course.vacanciesPerSchema,
            visibleSchedules: course.visibleSchedules,
            hiddenSchedules: course.hiddenSchedules,
          })
          .where(
            and(
              eq(
                enrollmentProposalCourses.enrollmentProposalId,
                enrollmentProposalId
              ),
              eq(enrollmentProposalCourses.courseId, course.courseId)
            )
          )
      )

      // Esperar a que todas las promesas de actualización se completen
      await Promise.all(updatePromises)
    })
  }

  public async getProposal(requestId: number): Promise<Partial<Proposal>> {
    const response = await db
      .select({
        state: enrollmentProposal.state,
      })
      .from(enrollmentProposal)
      .where(eq(enrollmentProposal.id, requestId))
    if (response.length === 0) {
      throw new Error('La propuesta no existe')
    }
    const [proposal] = response
    return proposal
  }

  public async getCoursesProposal(params: {
    proposalID: number
    page: number
    limit: number
    sortBy?: string
  }): Promise<PaginatedData<{
    proposalID: number
    courseId: number
    courseCode: string
    courseName: string
    vacants: number
    numberVisible: number
    numberHidden: number
  }> | null> {
    const { proposalID, page, limit, sortBy } = params

    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(enrollmentProposalCourses)
      .where(eq(enrollmentProposalCourses.enrollmentProposalId, proposalID))

    const proposalCourses = await db
      .select({
        proposalID: enrollmentProposalCourses.enrollmentProposalId,
        courseId: enrollmentProposalCourses.courseId,
        courseCode: courses.code,
        courseName: courses.name,
        vacants: enrollmentProposalCourses.vacanciesPerSchema,
        numberVisible: enrollmentProposalCourses.visibleSchedules,
        numberHidden: enrollmentProposalCourses.hiddenSchedules,
      })
      .from(enrollmentProposalCourses)
      .innerJoin(courses, eq(enrollmentProposalCourses.courseId, courses.id))
      .where(eq(enrollmentProposalCourses.enrollmentProposalId, proposalID))
      .offset(page * limit)
      .limit(limit)

    return {
      result: proposalCourses,
      rowCount: +total,
      currentPage: page,
      totalPages: Math.ceil(+total / limit),
      hasNext: +total > (page + 1) * limit,
    }
  }

  public async deleteCoursesInScheduleProposal(
    enrollmentProposalId: number,
    coursesList: number[]
  ) {
    //Validación 1 - La propuesta de horarios debe existir
    const existingEnrollmentProposal = await db
      .select()
      .from(enrollmentProposal)
      .where(eq(enrollmentProposal.id, enrollmentProposalId))
    if (existingEnrollmentProposal.length === 0) {
      throw new EnrollmentProposalNotFoundError(
        'La propuesta de horario no ha sido encontrada'
      )
    }

    //Validación 2 - Los cursos en la lista no se deben repetir
    const courseIdSet = new Set<number>()
    for (const course of coursesList) {
      if (courseIdSet.has(course)) {
        throw new RepeatedCoursesError(
          `El curso con ID ${course} está duplicado en la lista de cursos`
        )
      }
      courseIdSet.add(course)
    }

    //Ahora sí eliminamos los cursos en la tabla :)
    for (const course of coursesList) {
      await db
        .delete(enrollmentProposalCourses)
        .where(
          and(
            eq(
              enrollmentProposalCourses.enrollmentProposalId,
              enrollmentProposalId
            ),
            eq(enrollmentProposalCourses.courseId, course)
          )
        )
    }
  }
}

export default ScheduleProposalService
