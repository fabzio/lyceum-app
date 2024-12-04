import db from '@/database'
import { accountRoles, accounts, roles, terms } from '@/database/schema'
import { units, UnitsInsertSchema } from '@/database/schema/units'
import { Unit } from '@/interfaces/models/Unit'
import { PaginatedData } from '@/interfaces/PaginatedData'
import withPagination from '@/utils/withPagination'
import {
  aliasedTable,
  and,
  asc,
  desc,
  eq,
  ilike,
  inArray,
  or,
  sql,
} from 'drizzle-orm'
import { InsertUnitDTO } from '../dto/UnitDTO'
import { accountRoleSchema } from '@/modules/security/dto/RoleAccountsDTO'
import { accountRolesSchema } from '@/database/schema/accountRoles'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'

class UnitService {
  public async getUnitsByTypePaginated(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
    type: UnitsInsertSchema['type']
  }) {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }
    const mappedFields = {
      ['name']: units.name,
      ['type']: units.type,
    }

    const parentUni = aliasedTable(units, 'parentUnit')
    const [{ count }] = await db
      .select({
        count: sql<string>`count(*)`,
      })
      .from(units)
      .innerJoin(parentUni, eq(units.parentId, parentUni.id))
      .where(
        and(eq(units.type, params.type), ilike(units.name, `%${params.q}%`))
      )

    const query = db
      .select({
        id: units.id,
        name: units.name,
        unitType: units.type,
        parentName: parentUni.name,
        parentId: parentUni.id,
        active: units.active,
      })
      .from(units)
      .innerJoin(parentUni, eq(units.parentId, parentUni.id))
      .where(
        and(eq(units.type, params.type), ilike(units.name, `%${params.q}%`))
      )
      .$dynamic()
    const result = await withPagination(
      query,
      mappedSortBy[order as keyof typeof mappedSortBy](
        mappedFields[field as keyof typeof mappedFields]
      ),
      params.page,
      params.limit
    )
    return {
      result,
      currentPage: params.page,
      hasNext: +count > params.page * params.limit,
      rowCount: +count,
      totalPages: Math.ceil(+count / params.limit),
    } as PaginatedData<{
      id: Unit['id']
      name: Unit['name']
      unitType: Unit['unitType']
      parentName: Unit['name']
      parentId: Unit['id']
      active: Unit['active']
    }>
  }
  public async getUnitsByType({
    types,
    q = '',
  }: {
    q?: string
    types: UnitsInsertSchema['type'][]
  }) {
    return await db
      .select({
        id: units.id,
        name: units.name,
        unitType: units.type,
      })
      .from(units)
      .where(and(inArray(units.type, types), ilike(units.name, `%${q}%`)))
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

  public async createUnits(unitList: InsertUnitDTO[]) {
    let unitsToInsert: UnitsInsertSchema[] = []
    if (unitList.every((unit) => unit.parentName)) {
      const parentUnits = await db
        .select({
          id: units.id,
          name: units.name,
        })
        .from(units)
        .where(
          inArray(
            units.name,
            unitList.map((unit) => unit.parentName!)
          )
        )
      const parentUnitsMap = new Map(
        parentUnits.map((unit) => [unit.name, unit.id])
      )
      unitList.forEach((unit) => {
        if (!parentUnitsMap.has(unit.parentName!)) {
          throw new Error(`La unidad ${unit.parentName} no existe`)
        }
      })
      unitsToInsert = unitList.map((unit) => ({
        name: unit.name,
        type: unit.type,
        parentId: parentUnitsMap.get(unit.parentName!),
      }))
    } else unitsToInsert = unitList
    await db.insert(units).values(unitsToInsert)
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

  public async updateUnit({
    id,
    name,
    description,
    parentId,
    active,
  }: {
    id: number
    name: string
    description?: string
    parentId?: number
    active?: boolean
  }) {
    const existingUnit = await db.select().from(units).where(eq(units.id, id))

    if (existingUnit.length === 0) {
      throw new Error('La unidad no existe')
    }

    const wasActive = existingUnit[0].active

    // Actualizar los datos de la unidad
    const updatedUnit = await db
      .update(units)
      .set({
        name: name,
        description: description,
        parentId: parentId, // Si no se proporciona un `parentId`, se establece en null
        active: active,
      })
      .where(eq(units.id, id))
      .returning()

    if (active !== wasActive) {
      await this.updateChildrenActiveStatus(id, active!)
    }
    return updatedUnit[0] // Devuelve la unidad actualizada
  }

  private async updateChildrenActiveStatus(unitId: number, active: boolean) {
    const children = await this.getChildrenUnits(unitId)

    // Para cada hijo, actualizamos su estado "active"
    for (const child of children) {
      await db
        .update(units)
        .set({ active: active })
        .where(eq(units.id, child.id))

      // Recursivamente actualizamos los hijos de este hijo
      await this.updateChildrenActiveStatus(child.id, active)
    }
  }
  public async getTermsPaginated(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }): Promise<
    PaginatedData<{
      id: number
      name: string
      current: boolean
    }>
  > {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }

    const mappedFields = {
      ['name']: terms.name,
      ['current']: terms.current,
    }

    const [{ count }] = await db
      .select({
        count: sql<string>`count(*)`,
      })
      .from(terms)
      .where(params.q ? ilike(terms.name, `%${params.q}%`) : undefined)

    const query = db
      .select({
        id: terms.id,
        name: terms.name,
        current: terms.current,
      })
      .from(terms)
      .where(params.q ? ilike(terms.name, `%${params.q}%`) : undefined)
      .$dynamic()

    const result = await withPagination(
      query,
      mappedSortBy[order as keyof typeof mappedSortBy](
        mappedFields[field as keyof typeof mappedFields]
      ),
      params.page,
      params.limit
    )

    return {
      result,
      currentPage: params.page,
      hasNext: +count > params.page * params.limit,
      rowCount: +count,
      totalPages: Math.ceil(+count / params.limit),
    }
  }
  public async setCurrentTerm(id: number): Promise<void> {
    try {
      // Establecer el término actual como `current = true` y desactivar el resto
      await db.transaction(async (trx) => {
        // Poner todos los términos como `current = false`
        await trx.update(terms).set({ current: false })

        // Establecer el término específico como `current = true`
        await trx.update(terms).set({ current: true }).where(eq(terms.id, id))
      })
    } catch (error) {
      throw new Error(
        `No se pudo establecer el término actual para el ID: ${id}`
      )
    }
  }

  public async getStudentsFromAUnit({
    unitId,
    q,
  }: {
    unitId: number
    q: string
  }) {
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
        eq(accountRoles.accountId, accounts.id) // Relación entre accounts y accountRoles
      )
      .where(
        and(
          eq(accountRoles.roleId, BaseRoles.STUDENT), // Validar que el rol sea estudiante
          eq(accountRoles.unitId, unitId), // Validar unitId desde accountRoles
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname}) ilike ${`%${q}%`}`,
            ilike(accounts.code, `%${q}%`)
          )
        )
      )
      .limit(5)
  }
}

export default UnitService
