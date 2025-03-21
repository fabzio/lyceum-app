import db from '@/database'
import { accounts, thesis, thesisJuries, units } from '@/database/schema'
import { Account } from '@/interfaces/models/Account'
import { and, eq, not, sql, inArray } from 'drizzle-orm'
import { ThesisJuryDAO } from '../dao/thesisJuryDAO'
import ThesisThemeService from './thesisTheme.service'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'
import { ThesisJuryRequestNotFound } from '../errors'

class ThesisJuryService implements ThesisJuryDAO {
  private thesisThemeService: ThesisThemeDAO = new ThesisThemeService()
  public async startJuryRequest({ requestCode }: { requestCode: string }) {
    const updatedThesis = await db
      .update(thesis)
      .set({ juryState: 'requested' })
      .where(eq(thesis.requestCode, requestCode))
      .returning({
        thesisId: thesis.id,
      })

    if (!updatedThesis.length)
      throw new ThesisJuryRequestNotFound(
        'Tesis a solicitar jurados no encontrada'
      )
  }

  public async getThesisJuryRequests(
    unitID: number,
    filter?: 'unassigned' | 'requested' | 'assigned'
  ) {
    const getAllChildUnits = async (parentId: number): Promise<number[]> => {
      const childUnits = await db
        .select({ id: units.id })
        .from(units)
        .where(eq(units.parentId, parentId))

      if (!childUnits.length) return [parentId]

      const childIds = await Promise.all(
        childUnits.map(async (unit) => await getAllChildUnits(unit.id))
      )

      return [parentId, ...childIds.flat()]
    }

    const unitIds = (await getAllChildUnits(unitID)).filter((id) => !isNaN(id))

    const query = db
      .select({
        code: thesis.requestCode,
        title: thesis.title,
        date: thesis.date,
        aplicant: {
          name: accounts.name,
          firstSurname: accounts.firstSurname,
          secondSurname: accounts.secondSurname,
        },
        juryState: thesis.juryState,
      })
      .from(thesis)
      .innerJoin(accounts, eq(thesis.applicantId, accounts.id))
      .where(
        and(
          inArray(thesis.areaId, unitIds),
          filter ? eq(thesis.juryState, filter) : sql`1 = 1` // This will always be true, effectively ignoring the filter
        )
      )

    return await query
  }
  /**/
  public async getThesisJuries({ requestCode }: { requestCode: string }) {
    const [{ thesisId }] = await db
      .select({ thesisId: thesis.id })
      .from(thesis)
      .where(eq(thesis.requestCode, requestCode))
    const juries = await db
      .select({
        code: accounts.code,
        name: sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
      })
      .from(thesisJuries)
      .innerJoin(accounts, eq(thesisJuries.accountId, accounts.id))
      .where(eq(thesisJuries.thesisId, thesisId))
    return juries
  }

  public async insertThesisJuries({
    thesisCode,
    listAccountCode,
  }: {
    thesisCode: string
    listAccountCode: Account['code'][]
  }) {
    const uniqueAccounts = Array.from(new Set(listAccountCode))
    const [{ thesisId }] = await db
      .select({ thesisId: thesis.id })
      .from(thesis)
      .where(eq(thesis.requestCode, thesisCode))

    const getAccountId = async (accountCode: string) => {
      const [{ id }] = await db
        .select({ id: accounts.id })
        .from(accounts)
        .where(eq(accounts.code, accountCode))
      return id
    }

    const accountIds = await Promise.all(
      uniqueAccounts.map((accountCode) => getAccountId(accountCode))
    )

    const thesisJuriesData = accountIds.map((accountId) => ({
      thesisId,
      accountId,
    }))

    await db.transaction(async (tx) => {
      await tx.insert(thesisJuries).values(thesisJuriesData)
      await tx
        .update(thesis)
        .set({ juryState: 'assigned' })
        .where(eq(thesis.id, thesisId))
    })
  }

  async getThesisByStudentCode({ studentCode }: { studentCode: string }) {
    const studentResponse = await db
      .select({ studentId: accounts.id })
      .from(accounts)
      .where(eq(accounts.code, studentCode))

    if (!studentResponse.length)
      throw new ThesisJuryRequestNotFound('No se encontró al estudiante')

    const [{ studentId }] = studentResponse
    const thesisResponse = await db
      .select({ thesisCode: thesis.requestCode })
      .from(thesis)
      .where(
        and(
          eq(thesis.applicantId, studentId),
          eq(thesis.juryState, 'unassigned'),
          eq(thesis.aproved, true)
        )
      )
      .orderBy(thesis.date)
      .limit(1)
    if (!thesisResponse.length)
      throw new ThesisJuryRequestNotFound(
        'No se encontró una tesis aprobada del estudiante'
      )
    const [{ thesisCode }] = thesisResponse

    const thesisData =
      await this.thesisThemeService.getThesisThemeRequestDetail({
        requestCode: thesisCode,
      })
    return thesisData
  }
}

export default ThesisJuryService
