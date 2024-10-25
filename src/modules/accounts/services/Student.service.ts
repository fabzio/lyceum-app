import db from '@/database'
import { accountRoles, accounts, units } from '@/database/schema'
import { eq, sql, and, or, ilike, asc, desc } from 'drizzle-orm'
import { StudentDAO } from '../daos/StudentDAO'
import { StudenNotFoundError } from '../errors'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { Account } from '@/interfaces/models/Account'
import Accounts from '..'

class StudentService implements StudentDAO {
  async getStudentDetail(params: { code: string }) {
    const student = await db
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
          eq(accountRoles.roleId, BaseRoles.STUDENT)
        )
      )
    if (student.length === 0) {
      throw new StudenNotFoundError('El estudiante no fue encontrado')
    }
    const [studentDetail] = student
    return studentDetail
  }
  public async getAllStudents(params: {
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
    // FIXME: Estaria listando solo los estudiantes activos, deberia listar todos? Tal vez para la vista del admin?
    // state: 'active' | 'inactive' | 'deleted'
    // speciallity: string
  }>> {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']

    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(accounts)
      .leftJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .where(
        and(
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accountRoles.roleId, BaseRoles.STUDENT),
          //FIXME: Estaria listando solo los estudiantes activos, deberia listar todos? Tal vez para la vista del admin?
          eq(accounts.state, 'active')
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
    const StudentsResponse = await db
      .select({
        id: accounts.id,
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
      })
      .from(accounts)
      .leftJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .where(
        and(
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accountRoles.roleId, BaseRoles.STUDENT),
          //FIXME: Estaria listando solo los estudiantes activos, deberia listar todos? Tal vez para la vista del admin?
          eq(accounts.state, 'active')
        )
      )
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )

    const result = StudentsResponse.map((student) => ({
      code: student.code,
      name: student.name,
      firstSurname: student.firstSurname,
      secondSurname: student.secondSurname,
      email: student.email,
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

export default StudentService
