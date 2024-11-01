import db from '@/database'
import { accounts } from '@/database/schema'
import { accountRoles } from '@/database/schema/accountRoles'
import { roles } from '@/database/schema/roles'
import { units, UnitsInsertSchema } from '@/database/schema/units'
import { and, eq, sql } from 'drizzle-orm'

class RoleAccountsService {
  async getAllAccountRoles() {
    const accountRolesResponse = await db
      .select({
        account: {
          id: accounts.id,
          code: accounts.code,
          name: sql<string>`${accounts.name} || ' ' || ${accounts.firstSurname} || ' ' || ${accounts.secondSurname}`,
        },
        role: {
          id: roles.id,
          name: roles.name,
        },
        unit: {
          id: units.id,
          name: units.name,
        },
      })
      .from(accountRoles)
      .innerJoin(accounts, eq(accountRoles.accountId, accounts.id))
      .innerJoin(roles, eq(accountRoles.roleId, roles.id))
      .innerJoin(units, eq(accountRoles.unitId, units.id))
      .where(eq(roles.editable, true))

    const formattedResponse = accountRolesResponse.reduce(
      (
        acc: {
          id: string
          name: string
          code: string
          roles: {
            id: number
            name: string
            unitId: number
            unitName: string
          }[]
        }[],
        curr
      ) => {
        const accountIndex = acc.findIndex(
          (account) => account.id === curr.account.id
        )
        const role = {
          id: curr.role.id,
          name: curr.role.name,
          unitId: curr.unit.id,
          unitName: curr.unit.name,
        }

        if (accountIndex === -1) {
          acc.push({
            id: curr.account.id,
            name: curr.account.name,
            code: curr.account.code,
            roles: [role],
          })
        } else {
          acc[accountIndex].roles.push(role)
        }

        return acc
      },
      []
    )

    return formattedResponse
  }

  async insertAccountRole(accountRole: {
    accountId: string
    roleId: number
    unitId: number
  }): Promise<void> {
    await db.insert(accountRoles).values({
      accountId: accountRole.accountId,
      roleId: accountRole.roleId,
      unitId: accountRole.unitId,
    })
  }

  async deleteAccountRole(accountRole: {
    accountId: string
    roleId: number
    unitId: number
  }) {
    await db
      .delete(accountRoles)
      .where(
        and(
          eq(accountRoles.accountId, accountRole.accountId),
          eq(accountRoles.roleId, accountRole.roleId),
          eq(accountRoles.unitId, accountRole.unitId)
        )
      )
  }

  async getUnitScope(unitType: UnitsInsertSchema['type']) {
    return await db
      .select({
        id: units.id,
        name: units.name,
      })
      .from(units)
      .where(eq(units.type, unitType))
  }
}

export default RoleAccountsService
