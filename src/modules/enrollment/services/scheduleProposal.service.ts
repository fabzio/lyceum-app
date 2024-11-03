import db from '@/database'
import {
  enrollmentProposal,
  enrollmentProposalCourses,
  terms,
  units,
} from '@/database/schema'
import { and, eq, inArray, desc } from 'drizzle-orm'
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

  public async insertScheduleProposal(facultyId: number, accountId: string) {
    //validacion 1: la facultad debe existir
    const existingFaculty = await db
      .select()
      .from(units)
      .where(and(eq(units.id, facultyId), eq(units.type, 'faculty')))
    if (existingFaculty.length === 0) {
      throw new Error('La facultad no existe')
    }

    //validacion 2: la fecha de creacion de la propuesta debe estar dentro del ciclo vigente
    const currentTerm = await db
      .select()
      .from(terms)
      .where(eq(terms.current, true))
    if (currentTerm.length === 0) {
      //TODO: Encontrar la forma de validar que la fecha de creacion de la propuesta esté dentro del ciclo vigente
      throw new Error(
        'No se puede solicitar una propuesta fuera del ciclo vigente'
      )
    }

    //validación 3: la facultad debe tener al menos una expecialidad
    const existingSpecialties = await db
      .select()
      .from(units)
      .where(eq(units.parentId, facultyId))
    if (existingSpecialties.length === 0) {
      throw new Error('La facultad no tiene especialidades')
    }

    //insertamos la propuesta
    const enrollmentProposalId = await db.insert(enrollmentProposal).values(
      existingSpecialties.map((specialitie) => ({
        specialityId: specialitie.id,
        accountId: accountId,
        termId: currentTerm[0].id,
      }))
    )
  }

  public async getScheduleProposalsInUnit(unitId: number): Promise<
    {
      id: number
      specialityId: number
      termId: number
      state: 'requested' | 'sended' | 'aproved' | 'assigned'
      createdAt: Date | null
    }[]
  > {
    //Validación 1 - La unidad debe existir
    const existingUnit = await db
      .select({ type: units.type })
      .from(units)
      .where(eq(units.id, unitId))
    if (existingUnit.length === 0) {
      throw new Error('La unidad no existe')
    }

    if (existingUnit[0].type === 'faculty') {
      //obtener las especialidades de la facultad
      const specialities = await db
        .select({ id: units.id })
        .from(units)
        .where(eq(units.parentId, unitId))

      //Obtener las propuestas de horario de la facultad
      const proposals = await db
        .select()
        .from(enrollmentProposal)
        .where(
          inArray(
            enrollmentProposal.specialityId,
            specialities.map((speciality) => speciality.id)
          )
        )
      return proposals
    } else if (existingUnit[0].type === 'speciality') {
      //Obtener las propuestas de horario de la especialidad
      const proposals = await db
        .select()
        .from(enrollmentProposal)
        .where(eq(enrollmentProposal.specialityId, unitId))
      return proposals
    } else {
      throw new Error('La unidad no es una facultad ni una especialidad')
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

  public async getProposal(
    specialityId: number,
    termId?: number,
  ) : Promise<Proposal |  null>
  {
    let proposal: Proposal | null = null;
    if(termId == undefined){
      const latestProposalArray = await db.select().from(enrollmentProposal)
      .where(eq(enrollmentProposal.specialityId,specialityId))
      .orderBy(desc(enrollmentProposal.createdAt))
      .limit(1)
      proposal = latestProposalArray[0];
    }
    else{
      const altProposal = await db.select().from(enrollmentProposal)
      .where(and(eq(enrollmentProposal.specialityId, specialityId),
                 eq(enrollmentProposal.termId, termId)))
      proposal = altProposal[0]   
    }
    return proposal
  }

  public async getCoursesProposal(
    proposalId: number,
  ) : Promise<{
    id: number
    enrollmentProposalId: number
    courseId: number
    vacanciesPerSchema: number
    hiddenSchedules: number
    visibleSchedules: number
  }[]>
  {
    const proposalCourses = await db.select().from(enrollmentProposalCourses)
    .where(eq(enrollmentProposalCourses.enrollmentProposalId,proposalId))
    return proposalCourses
  }
}

export default ScheduleProposalService
