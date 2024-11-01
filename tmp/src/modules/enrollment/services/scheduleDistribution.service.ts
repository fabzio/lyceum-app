import db from '@/database'
import { scheduleAccounts, roles, schedules } from '@/database/schema'
import { eq, inArray, and } from 'drizzle-orm'
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

class ScheduleDistributionService implements ScheduleDistributionDAO {
  public async insertProfessorsToSchedule(
    scheduleId: number,
    ProfessorsList: {
      professorId: string
      islead: boolean
    }[]
  ) {
    //Validación 1 - Los AccountId no pueden repetirse ya que no puede registrarse 2 profesores en el mismo horario
    const AccountIdSet = new Set<string>()
    for (const professor of ProfessorsList) {
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
    if (ProfessorsList.length === 0) {
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
          ProfessorsList.map((profesor) => profesor.professorId.toString())
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
    await db.insert(scheduleAccounts).values(
      ProfessorsList.map((professor) => ({
        accountId: professor.professorId.toString(),
        scheduleId,
        roleId: BaseRoles.PROFESSOR,
        lead: professor.islead,
      }))
    )
  }
}

export default ScheduleDistributionService
