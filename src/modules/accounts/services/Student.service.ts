import db from '@/database'
import { accountRoles, accounts, units } from '@/database/schema'
import { eq, sql, and, or, ilike, asc, desc, inArray } from 'drizzle-orm'
import { StudentDAO } from '../daos/StudentDAO'
import { DuplicatedStudentCode, StudenNotFoundError } from '../errors'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
//import { Account } from '@/interfaces/models/Account'
//import Accounts from '..'

class StudentService implements StudentDAO {
  public async createStudent(
    studentList: {
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
      speciality: string
    }[]
  ) {
    // Verificar si hay estudiantes duplicados en la base de datos
    const existingStudents = await db
      .select({
        code: accounts.code,
      })
      .from(accounts)
      .where(
        inArray(
          accounts.code,
          studentList.map((student) => student.code)
        )
      )
    if (existingStudents.length > 0) {
      throw new DuplicatedStudentCode(
        'Los siguientes códigos de alumno ya existen: ' +
          existingStudents.map((student) => student.code).join(', ')
      )
    }

    const studentSpecialities = Array.from(
      new Set(studentList.map((student) => student.speciality))
    )

    const mapSpecialities = await db
      .select({
        id: units.id,
        name: units.name,
      })
      .from(units)
      .where(
        and(
          eq(units.type, 'speciality'),
          inArray(units.name, studentSpecialities)
        )
      )

    studentSpecialities.forEach((speciality) => {
      if (!mapSpecialities.some((unit) => unit.name === speciality)) {
        throw new Error(`La especialidad ${speciality} no existe`)
      }
    })

    const specialityMap = new Map<string, number>()
    mapSpecialities.forEach((unit) => {
      specialityMap.set(unit.name, unit.id)
    })

    await db.transaction(async (tx) => {
      const studentsId = await tx
        .insert(accounts)
        .values(
          studentList.map((student) => ({
            name: student.name,
            firstSurname: student.firstSurname,
            secondSurname: student.secondSurname,
            code: student.code,
            email: student.email,
            unitId: specialityMap.get(student.speciality)!,
          }))
        )
        .returning({ studentId: accounts.id, code: accounts.code })
      const studentMap = new Map<string, string>()

      studentsId.forEach((student) => {
        studentMap.set(student.code, student.studentId)
      })

      await tx.insert(accountRoles).values(
        studentList.map((student) => ({
          accountId: studentMap.get(student.code)!,
          roleId: BaseRoles.STUDENT,
          unitId: specialityMap.get(student.speciality)!,
        }))
      )
    })
  }

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
  }): Promise<
    PaginatedData<{
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
      speciality: string
      // FIXME: Estaria listando solo los estudiantes activos, deberia listar todos? Tal vez para la vista del admin?
      // state: 'active' | 'inactive' | 'deleted'
      // speciallity: string
    }>
  > {
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
      ['firstSurname']: accounts.firstSurname,
      ['secondSurname']: accounts.secondSurname,
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
        speciality: units.name,
      })
      .from(accounts)
      .leftJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accountRoles.unitId))
      .where(
        and(
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${params.q}%`}`,
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accountRoles.roleId, BaseRoles.STUDENT),
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
    return {
      result: StudentsResponse,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
      hasNext: +total > (params.page + 1) * params.limit,
    }
  }
}

export default StudentService
