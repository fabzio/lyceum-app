import db from '@/database'
import { accountRoles, accounts, units } from '@/database/schema'
import { and, eq } from 'drizzle-orm'
import { AdministrativeNotFound } from '../errors'
import { AdministrativeDAO } from '../daos'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'

class AdministrativeService implements AdministrativeDAO {
  async getAdministrativeDetail(params: { code: string }) {
    const admins = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
        state: accounts.state,
        unit: units.name,
      })
      .from(accounts)
      .innerJoin(units, eq(units.id, accounts.unitId))
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .where(
        and(
          eq(accounts.code, params.code),
          eq(accountRoles.roleId, BaseRoles.ADMIN)
        )
      )
    if (admins.length === 0) {
      throw new AdministrativeNotFound('Administrador no encontrado') //Este mensaje es el que se va a mostrar en el front
    }
    const [AdminDetail] = admins //Esto es para sacar el primer elemento del array
    return AdminDetail
  }
}

export default AdministrativeService
