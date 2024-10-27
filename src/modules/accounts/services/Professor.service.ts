import db from '@/database'
import { accountRoles, accounts, units } from '@/database/schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm'
import { ProfessorDAO } from '../daos/ProfessorDAO'
import {
  DuplicatedProfessorCode,
  ProfessorNotFoundError,
} from '../errors/Professor.error'

class ProfessorService implements ProfessorDAO {
  async getProfessorDetail(params: { code: string }) {
    const professor = await db
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
      .innerJoin(units, eq(units.id, accounts.unitId))
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .where(
        and(
          eq(accounts.code, params.code),
          eq(accountRoles.roleId, BaseRoles.PROFESSOR)
        )
      )
    if (professor.length === 0) {
      throw new ProfessorNotFoundError('El profesor no fue encontrado')
    }
    const [professorDetail] = professor
    return professorDetail
  }
  public async getAllProfessors(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }): Promise<
    PaginatedData<{
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
      //TODO: Decidir si se debe listar solo los profesores activos o todos
      state: 'active' | 'inactive' | 'deleted'
      speciallity: string
    }>
  > {
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
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accountRoles.roleId, BaseRoles.PROFESSOR)
        )
      )
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
    const ProfessorsResponse = await db
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
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accountRoles.roleId, BaseRoles.PROFESSOR)
        )
      )
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )
    const result = ProfessorsResponse.map((Professor) => ({
      code: Professor.code,
      name: Professor.name,
      firstSurname: Professor.firstSurname,
      secondSurname: Professor.secondSurname,
      email: Professor.email,
      state: Professor.state,
      speciallity: Professor.speciallity,
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
  public async createProfessor(
    professorList: {
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
    }[]
  ) {
    const existingProfessors = await db
      .select()
      .from(accounts)
      .where(
        inArray(
          accounts.code,
          professorList.map((accounts) => accounts.code)
        )
      )
    if (existingProfessors.length > 0) {
      throw new DuplicatedProfessorCode(
        'Los siguientes profesores ya existen: ' +
          existingProfessors.map((accounts) => accounts.code).join(', ')
      )
    }
    await db.transaction(async (tx) => {
      const studentsId = await tx
        .insert(accounts)
        .values(
          professorList.map((professor) => ({
            name: professor.name,
            firstSurname: professor.firstSurname,
            secondSurname: professor.secondSurname,
            code: professor.code,
            email: professor.email,
            googleId: null,
            state: 'active' as const,
            unitId: 1, //no deberia tener unitId porque es de muchos a muchos
          }))
        )
        .returning({ professorId: accounts.id })
      await tx.insert(accountRoles).values(
        studentsId.map((professor) => ({
          accountId: professor.professorId,
          roleId: BaseRoles.PROFESSOR,
          unitId: 1,
        }))
      )
    })
  }
}

export default ProfessorService
