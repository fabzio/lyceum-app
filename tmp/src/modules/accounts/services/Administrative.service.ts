import db from '@/database'
import { accountRoles, accounts, units } from '@/database/schema'
import { and, asc, desc, eq, ilike, or, sql, inArray } from 'drizzle-orm'
import { AdministrativeNotFound } from '../errors'
import { AdministrativeDAO } from '../daos'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { uuid } from 'drizzle-orm/pg-core'
import { DuplicateAdministrativeCode } from '../errors/Administrative.error'

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
  public async getAllAdministratives(params: {
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
    //TODO: Decidir si se debe listar solo los profesores activos o todos
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
      .where(
        and(
        or(ilike(accounts.name, `%${params.q}%`),
          ilike(accounts.code, `%${params.q}%`)),
        eq(accountRoles.roleId, BaseRoles.ADMIN)
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
    const AdministrativesResponse = await db
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
    .where(
      and(
      or(ilike(accounts.name, `%${params.q}%`),
        ilike(accounts.code, `%${params.q}%`)),
      eq(accountRoles.roleId, BaseRoles.ADMIN)
    ))
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )
    const result = AdministrativesResponse.map((Administrative) => ({
      code: Administrative.code,
      name: Administrative.name,
      firstSurname: Administrative.firstSurname,
      secondSurname: Administrative.secondSurname,
      email: Administrative.email,
      state: Administrative.state,
      speciallity: Administrative.speciallity,
    }))
    return {
      result,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
      hasNext: +total > (params.page + 1) * params.limit,
    }
  }
  //TODO Add methods here

  public async uploadAdministrativeList(administrativeList: {
    name: string
    firstSurname: string
    secondSurname: string 
    code: string
    email: string
    }[]
  ){
    const existingAdministratives = await db
      .select()
      .from(accounts)
      .where(
        inArray(
          accounts.code,
          administrativeList.map((administrative) => administrative.code)
        )
      )
    if (existingAdministratives.length > 0) {
      throw new DuplicateAdministrativeCode(
        'Los siguientes códigos de personal administrativo ya existen: ' +
        existingAdministratives.map((administrative) => administrative.code).join(', ')
      )
    }

    await db.transaction(async (tx) => {
      const newAccounts = await tx.insert(accounts).values(
        administrativeList.map((newUser) => ({
          name: newUser.name,
          firstSurname: newUser.firstSurname,
          secondSurname: newUser.secondSurname,
          code: newUser.code,
          email: newUser.email,
          unitId: 1,
        }))
      ).returning({ uuid: accounts.id });
  
      await tx.insert(accountRoles).values(
        newAccounts.map((account) => ({
          accountId: account.uuid,
          roleId: BaseRoles.ADMIN,
          unitId: 1,
        }))
      );
    }
  )

  }
}

export default AdministrativeService
