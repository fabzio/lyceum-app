import db from '@/database'
import { accounts, units } from '@/database/schema'
import { eq, sql } from 'drizzle-orm'
import { StudentDAO } from '../daos/StudentDAO'

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
      .where(eq(accounts.code, params.code))
    if (student.length === 0) {
      throw new Error('Student not found')
    }
    const [studentDetail] = student
    return studentDetail
  }
}

export default StudentService
