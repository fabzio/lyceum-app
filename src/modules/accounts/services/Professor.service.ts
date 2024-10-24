import db from '@/database'
import { accounts, units, accountRoles } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { ProfessorDAO } from '../daos/ProfessorDAO'
import { ProfessorNotFoundError } from '../errors'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { and } from 'drizzle-orm'

class ProfessorService implements ProfessorDAO {
  
  async getProfessorDetail(params: { code: string }) {
    const professor = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
        state: accounts.state,
        speciallity: units.name,
      })
      .from(accounts)
      .innerJoin(units, eq(units.id, accounts.unitId))
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .where(
        and(
          eq(accounts.code, params.code),
          eq(accountRoles.roleId, BaseRoles.PROFESSOR)
        )
      )
    if (professor.length === 0) {
      throw new ProfessorNotFoundError('El profesor no fue encontrado')
    }
    const [professorDetail] = professor
    return professorDetail
  }
  async getAllProfessors() {
    const professors = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
        state: accounts.state,
        speciallity: units.name,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accounts.unitId))
      .where(eq(accountRoles.roleId, BaseRoles.PROFESSOR))
    return professors
  }
}

export default ProfessorService
