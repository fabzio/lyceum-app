import db from '@/database'
import { accountRoles, accounts, units, unitType } from '@/database/schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
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
import { ProfessorDAO } from '../daos/ProfessorDAO'
import {
  DuplicatedProfessorCode,
  ProfessorNotFoundError,
} from '../errors/Professor.error'

class ProfessorService implements ProfessorDAO {
  async getProfessorDetail(params: { code: string }) {
    const parentUnit = aliasedTable(units, 'parentUnit')
    const professor = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
        state: accounts.state,
        unit: units.name,
        unitType: units.type,
        parent: parentUnit.name,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accountRoles.unitId))
      .innerJoin(parentUnit, eq(parentUnit.id, units.parentId))
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
    return {
      ...professorDetail,
      parent:
        professorDetail.unitType === 'section' ? professorDetail.parent : null,
    }
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
      state: 'active' | 'inactive' | 'deleted'
      unit: string
    }>
  > {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']

    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accountRoles.unitId))
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
        unit: units.name,
        unitType: units.type,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accountRoles.unitId))
      .where(
        and(
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${params.q}%`}`,
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
    return {
      result: ProfessorsResponse,
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
      unitName: string
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
      const professorsUnits = Array.from(
        new Set(professorList.map((professor) => professor.unitName))
      )

      const unitList = await tx
        .select({
          id: units.id,
          name: units.name,
        })
        .from(units)
        .where(
          and(
            inArray(units.name, professorsUnits),
            or(eq(units.type, 'department'), eq(units.type, 'section'))
          )
        )
      const unitMap = new Map()

      professorsUnits.forEach((unitName) => {
        if (!unitList.some((unit) => unit.name === unitName)) {
          throw new Error(`El departamento o sección ${unitName} no existe`)
        }
      })

      unitList.forEach((unit) => {
        unitMap.set(unit.name, unit.id)
      })

      const professorId = await tx
        .insert(accounts)
        .values(
          professorList.map((professor) => ({
            name: professor.name,
            firstSurname: professor.firstSurname,
            secondSurname: professor.secondSurname,
            code: professor.code,
            email: professor.email,
            googleId: null,
            unitId: unitMap.get(professor.unitName),
          }))
        )
        .returning({ professorId: accounts.id, code: accounts.code })

      const professorMap = new Map()

      professorId.forEach((professor) => {
        professorMap.set(professor.code, professor.professorId)
      })

      await tx.insert(accountRoles).values(
        professorList.map((professor) => ({
          accountId: professorMap.get(professor.code),
          roleId: BaseRoles.PROFESSOR,
          unitId: unitMap.get(professor.unitName),
        }))
      )
    })
  }
}

export default ProfessorService
