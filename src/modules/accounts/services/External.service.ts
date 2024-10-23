import db from '@/database'
import { accounts, units, accountRoles } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { ExternalDAO } from '../daos/ExternalDAO'
import { ExternalNotFoundError } from '../errors'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'

class ExternalService implements ExternalDAO {
  //Listar solo Externos
  async getAllExternal() {
    const externals = await db
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
      .where(eq(accountRoles.roleId, BaseRoles.EXTERNAL))
    return externals
  }
}

export default ExternalService
