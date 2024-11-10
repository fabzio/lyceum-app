import db from '@/database'
import { accountRoles, accounts, roles } from '@/database/schema'
import { units, UnitsInsertSchema } from '@/database/schema/units'
import withPagination from '@/utils/withPagination'
import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm'

class UnitService {
  public async getUnitsByType(type: UnitsInsertSchema['type'][]) {
    return await db
      .select({
        id: units.id,
        name: units.name,
      })
      .from(units)
      .where(inArray(units.type, type))
  }

  public async getChildrenUnits(unitId: NonNullable<UnitsInsertSchema['id']>) {
    return await db
      .select({
        id: units.id,
        name: units.name,
      })
      .from(units)
      .where(eq(units.parentId, unitId))
  }

  public async getUnitDetail(unitId: NonNullable<UnitsInsertSchema['id']>) {
    const unitFound = await db
      .select({
        id: units.id,
        name: units.name,
        description: units.description,
        details: units.details,
        type: units.type,
        parentId: units.parentId,
      })
      .from(units)
      .where(eq(units.id, unitId))

    if (unitFound.length === 0) {
      throw new Error('Unit not found')
    }

    return unitFound[0]
  }

  public async createUnits(unitList: UnitsInsertSchema[]) {
    await db.insert(units).values(unitList)
  }

  public async getAccountsInUnit(params: {
    unitId: NonNullable<UnitsInsertSchema['id']>
    q?: string
    page: number
    limit: number
    sortBy?: string
  }) {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }
    const mappedFields = {
      ['name']: accounts.name,
      ['firstSurname']: accounts.firstSurname,
      ['secondSurname']: accounts.secondSurname,
      ['code']: accounts.code,
      ['email']: accounts.email,
    }
    const query = db
      .selectDistinct({
        name: accounts.name,
        surname: sql<string>`concat(${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
        code: accounts.code,
        email: accounts.email,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accounts.id, accountRoles.accountId))
      .where(
        and(
          eq(accountRoles.unitId, params.unitId),
          or(
            sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname}) ilike ${params.q}`,
            ilike(accounts.code, `%${params.q}%`)
          )
        )
      )

    return await withPagination(
      query.$dynamic(),
      mappedSortBy[order as keyof typeof mappedSortBy](
        mappedFields[field as keyof typeof mappedFields]
      ),
      params.page,
      params.limit
    )
  }

  public async getRolesOfUnitType(unitType: UnitsInsertSchema['type']) {
    return await db
      .select({
        id: roles.id,
        name: roles.name,
      })
      .from(roles)
      .where(and(eq(roles.unitType, unitType), eq(roles.editable, true)))
  }
}

export default UnitService
