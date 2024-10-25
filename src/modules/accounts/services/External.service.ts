import db from '@/database'
import { accounts, units, accountRoles } from '@/database/schema'
import { and, asc, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { ExternalDAO } from '../daos/ExternalDAO'
import { ExternalNotFoundError } from '../errors'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
class ExternalService implements ExternalDAO {
  
  public async getAllExternals(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }): Promise<PaginatedData<{
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    email: string
    state: 'active' | 'inactive' | 'deleted'
    speciallity: string
  }>> {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']

    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accounts.unitId))
      .where(and(
        or(ilike(accounts.name, `%${params.q}%`),
          ilike(accounts.code, `%${params.q}%`)),
        eq(accountRoles.roleId, BaseRoles.EXTERNAL)
      ))
    const mappedFields = {
      ['name']: accounts.name,
      ['code']: accounts.code,
      ['firstSurname']: accounts.email,
      ['secondSurname']: accounts.email,
      ['email']: accounts.email,
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }
    const ExternalsResponse = await db
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
    .where(and(
      or(ilike(accounts.name, `%${params.q}%`),
        ilike(accounts.code, `%${params.q}%`)),
      eq(accountRoles.roleId, BaseRoles.EXTERNAL)
    ))
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )
    const result = ExternalsResponse.map((External) => ({
      code: External.code,
      name: External.name,
      firstSurname: External.firstSurname,
      secondSurname: External.secondSurname,
      email: External.email,
      state: External.state,
      speciallity: External.speciallity,
    }))
    return {
      result,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
      hasNext: +total > (params.page + 1) * params.limit,
    }
  }
}


export default ExternalService
