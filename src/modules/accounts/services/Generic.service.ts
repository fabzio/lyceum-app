import db from '@/database'
import {
  accountRoles,
  accounts,
  modules,
  permissions,
  rolePermissions,
  scheduleAccounts,
  terms,
} from '@/database/schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm'

class GenericService {
  public async getAccount({
    q,
    userType,
  }: {
    q: string
    userType?: BaseRoles
  }) {
    if (!userType) {
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
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${q}%`}`,
            ilike(accounts.code, `%${q}%`)
          )
        )
        .limit(5)
    } else {
      return await db
        .select({
          id: accounts.id,
          name: accounts.name,
          firstSurname: accounts.firstSurname,
          secondSurname: accounts.secondSurname,
          code: accounts.code,
        })
        .from(accounts)
        .innerJoin(
          accountRoles,
          and(
            eq(accountRoles.accountId, accounts.id),
            eq(accountRoles.roleId, userType)
          )
        )
        .where(
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${q}%`}`,
            ilike(accounts.code, `%${q}%`)
          )
        )
        .limit(5)
    }
  }

  public async getAccountsBySchedule(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
    scheduleId?: string // Parámetro `scheduleId`
  }): Promise<
    PaginatedData<{
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
      roles: number[]
    }>
  > {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']
    // Obtener el total de registros con el filtro `scheduleId`
    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(accounts)
      .leftJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(scheduleAccounts, eq(scheduleAccounts.accountId, accounts.id)) // JOIN con `scheduleAccounts`
      .where(
        and(
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accounts.state, 'active'),
          params.scheduleId
            ? eq(scheduleAccounts.scheduleId, Number(params.scheduleId))
            : sql`1=1` // Filtro opcional `scheduleId`
        )
      )
    const mappedFields = {
      ['name']: accounts.name,
      ['code']: accounts.code,
      ['firstSurname']: accounts.firstSurname,
      ['secondSurname']: accounts.secondSurname,
      ['email']: accounts.email,
      ['roles']: accountRoles.roleId,
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }
    // Obtener los datos con la misma estructura de filtros
    const AccountsResponse = await db
      .select({
        id: accounts.id,
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
        roles: sql<number[]>`array_agg(${accountRoles.roleId})`,
      })
      .from(accounts)
      .leftJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(scheduleAccounts, eq(scheduleAccounts.accountId, accounts.id)) // JOIN con `scheduleAccounts`
      .where(
        and(
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accounts.state, 'active'),
          params.scheduleId
            ? eq(scheduleAccounts.scheduleId, Number(params.scheduleId))
            : sql`1=1` // Filtro opcional `scheduleId`
        )
      )
      .groupBy(accounts.id)
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )

    return {
      result: AccountsResponse,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
      hasNext: +total > (params.page + 1) * params.limit,
    }
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
    const currentTerm = await db
      .select({
        id: terms.id,
        name: terms.name,
      })
      .from(terms)
      .where(eq(terms.current, true))
    if (!account.googleId) {
      await db
        .update(accounts)
        .set({ googleId })
        .where(eq(accounts.code, account.code))
    }
    return {
      ...account,
      allowedModules,
      roles: rolesWithPermissions,
      term: currentTerm,
    }
  }

  public static async setAccountPassword({
    code,
    password,
  }: {
    code: string
    password: string
  }) {
    await db
      .update(accounts)
      .set({ password: await Bun.password.hash(password) })
      .where(eq(accounts.code, code))
  }

  public static async lyceumLogin({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    const accountResponse = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        surname: sql<string>`concat(${accounts.firstSurname} || ' ' || ${accounts.secondSurname})`,
        code: accounts.code,
        email: accounts.email,
        password: accounts.password,
      })
      .from(accounts)
      .where(or(eq(accounts.email, email), eq(accounts.code, email)))
    if (accountResponse.length === 0) {
      throw new Error('Su cuenta no está registrada en el sistema')
    }
    const [account] = accountResponse
    if (account.password === null) {
      throw new Error('Su cuenta no tiene contraseña')
    }
    try {
      if (!(await Bun.password.verify(password, account.password)))
        throw new Error('Contraseña incorrecta')
    } catch (error) {
      throw error
    }
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
    const currentTerm = await db
      .select({
        id: terms.id,
        name: terms.name,
      })
      .from(terms)
      .where(eq(terms.current, true))
    return {
      ...account,
      password: null,
      allowedModules,
      roles: rolesWithPermissions,
      term: currentTerm,
    }
  }
}

export default GenericService
