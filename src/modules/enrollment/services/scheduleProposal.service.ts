import db from '@/database'
import {
  enrollmentProposal,
  enrollmentProposalCourses,
} from '@/database/schema'
import { eq, inArray } from 'drizzle-orm'
import {
  RepeatedCoursesError,
  NoCoursesSendedError,
  EnrollmentProposalNotFoundError,
  CourseAlreadyAddedError,
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
}

export default ScheduleProposalService
