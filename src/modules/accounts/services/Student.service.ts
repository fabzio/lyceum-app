import db from '@/database'
import { accountRoles, accounts, units } from '@/database/schema'
import { eq, sql, and } from 'drizzle-orm'
import { StudentDAO } from '../daos/StudentDAO'
import { StudenNotFoundError } from '../errors'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'

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
}

export default StudentService
