import db from '@/database'
import {
  scheduleAccounts,
  roles,
  schedules,
  enrollmentProposalCourses,
  enrollmentProposal,
  studyPlanCourses,
  studyPlans,
  specialityStudyPlans,
  units,
  courses,
  terms,
} from '@/database/schema'
import { eq, inArray, and, desc, or } from 'drizzle-orm'
import {
  NoProfessorsSendedError,
  RepeatedProfessorError,
  ScheduleNotFoundError,
  ProfessorAlreadyAddedError,
  LeadProfessorAlreadyExistsError,
} from '../errors'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { ScheduleDistributionDAO } from '../dao'
import { error } from 'console'
import { ScheduleSchema } from '@/database/schema/schedules'
import { Unit } from '@/interfaces/models/Unit'
import { CourseSchedule } from '../dao/scheduleDistributionDAO'
import groupBy from 'just-group-by'

class ScheduleDistributionService implements ScheduleDistributionDAO {
  public async insertProfessorsToSchedule(
    scheduleId: number,
    professorsList: {
      professorId: string
      isLead: boolean
    }[]
  ) {
    //Validación 1 - Los AccountId no pueden repetirse ya que no puede registrarse 2 profesores en el mismo horario
    const AccountIdSet = new Set<string>()
    for (const professor of professorsList) {
      if (AccountIdSet.has(professor.professorId)) {
        throw new RepeatedProfessorError(
          `El profesor con ID ${professor.professorId} está duplicado en la lista del profesores del horario`
        )
      }
      AccountIdSet.add(professor.professorId)
    }

    //Validación 2 - El horario a ingresar debe existir.
    const existingSchedule = await db
      .select()
      .from(schedules)
      .where(eq(schedules.id, scheduleId))
    if (existingSchedule.length === 0) {
      throw new ScheduleNotFoundError('El horario no existe')
    }

    //Validación 3 - Los cursos a agregar a la propuesta no deben ser cero
    if (professorsList.length === 0) {
      throw new NoProfessorsSendedError(
        'Se envió una lista de profesores vacía'
      )
    }

    //Validación 4 - Verificamos que los profesores que vamos a agregar al horario
    //ya no han sido agregados antes
    const existingScheduleProfessor = await db
      .select()
      .from(scheduleAccounts)
      .where(
        inArray(
          scheduleAccounts.accountId,
          professorsList.map((profesor) => profesor.professorId.toString())
        )
      )
    if (existingScheduleProfessor.length > 0) {
      throw new ProfessorAlreadyAddedError(
        'Alguno de los profesores que se quiere agregar ya ha sido agregado'
      )
    }
    //Validacion 5 - Verificamos si no hay mas de un lead

    const existingLeadProfessor = await db
      .select()
      .from(scheduleAccounts)
      .where(
        and(
          eq(scheduleAccounts.scheduleId, scheduleId),
          eq(scheduleAccounts.lead, true)
        )
      )

    if (existingLeadProfessor.length > 0) {
      throw new LeadProfessorAlreadyExistsError(
        'Ya existe un profesor principal (lead) en el horario especificado'
      )
    }

    // Insertamos los profesores en la tabla scheduleAccount
    await db.transaction(async (tx) => {
      await tx.insert(scheduleAccounts).values(
        professorsList.map((professor) => ({
          accountId: professor.professorId,
          scheduleId,
          roleId: BaseRoles.PROFESSOR,
          lead: professor.isLead,
        }))
      )
      await tx
        .update(schedules)
        .set({ state: 'saved' })
        .where(eq(schedules.id, scheduleId))
    })
  }

  public async getCoursesScheduleDistribution({
    unitId,
  }: {
    unitId: Unit['id']
  }) {
    const unitTypeResponse = await db
      .select({
        unitType: units.type,
      })
      .from(units)
      .where(eq(units.id, unitId))

    if (!unitTypeResponse.length) {
      throw new Error('No se encontró la unidad especificada')
    }

    const [{ unitType }] = unitTypeResponse
    let coursesSchedule: {
      course: {
        id: number
        name: string
        code: string
      }
      schedule: {
        id: number
        code: string
        state: 'saved' | 'editing'
        vacancies: number
      }
    }[]
    if (unitType === 'department' || unitType === 'section') {
      coursesSchedule = await this.getCoursesOfDepartmentOrSection(unitId)
    } else if (unitType === 'speciality') {
      coursesSchedule = await this.getCoursesOfProposalSpeciality(unitId)
    } else {
      throw new Error('Tipo de unidad no soportado')
    }
    const coursesScheduleGrouped = groupBy(
      coursesSchedule,
      (course) => course.course.id
    )
    const coursesScheduleFormated: CourseSchedule[] = []

    Object.entries(coursesScheduleGrouped).forEach(
      ([courseId, courseSchedules]) => {
        coursesScheduleFormated.push({
          id: parseInt(courseId),
          code: courseSchedules[0].course.code,
          name: courseSchedules[0].course.name,
          schedules: courseSchedules.map(
            (courseSchedule) => courseSchedule.schedule
          ),
        })
      }
    )

    return coursesScheduleFormated
  }
  public async updateScheduleVisibility({
    scheduleId,
    visibility,
  }: {
    scheduleId: number
    visibility: ScheduleSchema['visibility']
  }) {
    await db
      .update(schedules)
      .set({ visibility })
      .where(eq(schedules.id, scheduleId))
  }
  private async getCoursesOfProposalSpeciality(speciality: Unit['id']) {
    return await db
      .select({
        course: {
          id: courses.id,
          name: courses.name,
          code: courses.code,
        },
        schedule: {
          id: schedules.id,
          code: schedules.code,
          vacancies: schedules.vacancies,
          state: schedules.state,
          visibility: schedules.visibility,
        },
      })
      .from(enrollmentProposalCourses)
      .innerJoin(
        enrollmentProposal,
        eq(
          enrollmentProposal.id,
          enrollmentProposalCourses.enrollmentProposalId
        )
      )
      .innerJoin(courses, eq(courses.id, enrollmentProposalCourses.courseId))
      .innerJoin(schedules, and(eq(schedules.courseId, courses.id)))
      .innerJoin(terms, eq(terms.id, enrollmentProposal.termId))
      .where(
        and(
          eq(enrollmentProposal.state, 'aproved'),
          eq(terms.current, true),
          eq(enrollmentProposal.specialityId, speciality)
        )
      )
  }

  private async getCoursesOfDepartmentOrSection(unitId: Unit['id']) {
    return await db
      .select({
        course: {
          id: courses.id,
          name: courses.name,
          code: courses.code,
        },
        schedule: {
          id: schedules.id,
          code: schedules.code,
          vacancies: schedules.vacancies,
          state: schedules.state,
        },
      })
      .from(schedules)
      .innerJoin(courses, eq(courses.id, schedules.courseId))
      .innerJoin(units, eq(units.id, courses.unitId))
      .where(
        and(
          or(eq(units.parentId, unitId), eq(courses.unitId, unitId)),
          eq(schedules.state, 'editing')
        )
      )
  }
}

export default ScheduleDistributionService
