import db from '@/database'
import {
  accountRoles,
  accounts,
  modules,
  permissions,
  rolePermissions,
} from '@/database/schema'
import { eq, ilike, inArray, or, sql } from 'drizzle-orm'

class GenericService {
  public async getAccount({ q }: { q: string }) {
    return await db
      .select({
        id: accounts.id,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        code: accounts.code,
      })
      .from(accounts)
      .where(
        or(
          ilike(accounts.name, `%${q}%`),
          ilike(accounts.firstSurname, `%${q}%`),
          ilike(accounts.secondSurname, `%${q}%`),
          ilike(accounts.code, `%${q}%`)
        )
      )
      .limit(5)
  }

  public static async googleLogin({
    email,
    googleId,
  }: {
    email: string
    googleId: string
  }) {
    const accountResponse = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        surname: sql<string>`concat(${accounts.firstSurname} || ' ' || ${accounts.secondSurname})`,
        code: accounts.code,
        email: accounts.email,
        googleId: accounts.googleId,
      })
      .from(accounts)
      .where(or(eq(accounts.email, email), eq(accounts.googleId, googleId)))
    if (accountResponse.length === 0) {
      throw new Error('Su cuenta no está registrada en el sistema')
    }

    const [account] = accountResponse
    const allowedRoles = await db
      .select({
        roleId: accountRoles.roleId,
        unitId: accountRoles.unitId,
      })
      .from(accountRoles)
      .where(eq(accountRoles.accountId, account.id))
    const allowedRolePemissions = await db
      .select({
        roleId: rolePermissions.roleId,
        permission: permissions.name,
        module: modules.code,
      })
      .from(rolePermissions)
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .innerJoin(modules, eq(permissions.moduleId, modules.id))
      .where(
        inArray(
          rolePermissions.roleId,
          allowedRoles.map((role) => role.roleId)
        )
      )
    const rolesWithPermissions = allowedRoles.map((role) => ({
      ...role,
      permissions: allowedRolePemissions
        .filter((permission) => permission.roleId === role.roleId)
        .map((permission) => ({
          permission: permission.permission,
          module: permission.module,
        })),
    }))

    const allowedModules = Array.from(
      new Set(allowedRolePemissions.map((permissions) => permissions.module))
    )
    if (!account.googleId) {
      await db
        .update(accounts)
        .set({ googleId })
        .where(eq(accounts.code, account.code))
    }
    return { ...account, allowedModules, roles: rolesWithPermissions }
  }
}

export default GenericService
