import db from '@/database'
import {
  enrollmentProposal,
  enrollmentProposalCourses,
} from '@/database/schema'
import { and, eq, inArray } from 'drizzle-orm'
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
}

export default ScheduleProposalService
