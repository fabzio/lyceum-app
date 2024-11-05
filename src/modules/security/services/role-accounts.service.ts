import db from '@/database'
import { accounts, permissions, rolePermissions } from '@/database/schema'
import { accountRoles } from '@/database/schema/accountRoles'
import { roles } from '@/database/schema/roles'
import { units, UnitsInsertSchema } from '@/database/schema/units'
import { and, eq, inArray, sql } from 'drizzle-orm'
import { ExistingPermissionError } from '../errors/RoleAccounts.error'

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

    const accountsMap = new Map()

    accountRolesResponse.forEach(({ account, role, unit }) => {
      if (!accountsMap.has(account.id)) {
        accountsMap.set(account.id, {
          id: account.id,
          name: account.name,
          code: account.code,
          roles: [],
        })
      }

      accountsMap.get(account.id).roles.push({
        id: role.id,
        name: role.name,
        unitId: unit.id,
        unitName: unit.name,
      })
    })

    return Array.from(accountsMap.values())
  }

  async insertAccountRole(accountRole: {
    accountId: string
    roleId: number
    unitId: number
  }): Promise<void> {
    const existingPermissions = await db
      .select({
        permissions: permissions.description,
      })
      .from(accountRoles)
      .innerJoin(roles, eq(accountRoles.roleId, roles.id))
      .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(
        and(
          eq(accountRoles.accountId, accountRole.accountId),
          inArray(
            rolePermissions.permissionId,
            db
              .select({
                permissionId: rolePermissions.permissionId,
              })
              .from(rolePermissions)
              .where(eq(rolePermissions.roleId, accountRole.roleId))
          )
        )
      )

    if (existingPermissions.length) {
      const existingPermissionsString = existingPermissions
        .map((permission) => permission.permissions)
        .join(', ')
      throw new ExistingPermissionError(
        'No se puede asignar el rol a esta cuenta porque ya tiene los permisos: ' +
          existingPermissionsString
      )
    }

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
