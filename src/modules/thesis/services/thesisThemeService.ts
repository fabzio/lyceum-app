import db from '@/database'
import {
  accounts,
  roles,
  thesisActions,
  thesis,
  units,
} from '@/database/schema'
import {
  thesisAccounts,
  ThesisAccountsSchema,
} from '@/database/schema/thesisAccounts'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { and, eq, sql } from 'drizzle-orm'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'
import { ThesisActionsSchema } from '@/database/schema/thesisActions'
import { CreateThesisDTO } from '../dto/createThesisDTO'
import { generateThesisCode } from '../utils'

class ThesisThemeService implements ThesisThemeDAO {
  async getThesisThemeRequest() {
    const themeRequestResponse = await db
      .select({
        code: thesis.requestCode,
        title: thesis.title,
        date: thesis.date,
        lastAction: {
          id: thesisActions.id,
          account: thesisActions.accountId,
          action: thesisActions.action,
          role: roles.name,
        },
        applicant: {
          name: sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
          code: accounts.code,
        },
        aproved: thesis.aproved,
      })
      .from(thesis)
      .innerJoin(accounts, eq(thesis.applicantId, accounts.id))
      .innerJoin(thesisActions, eq(thesisActions.id, thesis.lastActionId))
      .innerJoin(roles, eq(thesisActions.roleId, roles.id))
    return themeRequestResponse
  }

  async getThesisThemeRequestDetail({ requestCode }: { requestCode: string }) {
    const generalRequestData = await db
      .select({
        code: thesis.requestCode,
        title: thesis.title,
        date: thesis.date,
        area: units.name,
        juryState: thesis.juryState,
        applicant: {
          name: sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
          code: accounts.code,
        },
        lastAction: {
          id: thesisActions.id,
          account: thesisActions.accountId,
          action: thesisActions.action,
          role: roles.name,
        },
        aproved: thesis.aproved,
      })
      .from(thesis)
      .innerJoin(accounts, eq(thesis.applicantId, accounts.id))
      .innerJoin(units, eq(thesis.areaId, units.id))
      .innerJoin(thesisActions, eq(thesisActions.id, thesis.lastActionId))
      .innerJoin(roles, eq(thesisActions.roleId, roles.id))
      .where(eq(thesis.requestCode, requestCode))

    const students = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        principal: thesisAccounts.lead,
      })
      .from(thesis)
      .innerJoin(
        thesisAccounts,
        and(
          eq(thesis.id, thesisAccounts.thesisThemeRequestId),
          eq(thesisAccounts.roleId, BaseRoles.STUDENT)
        )
      )
      .innerJoin(accounts, eq(thesisAccounts.accountId, accounts.id))
      .where(eq(thesis.requestCode, requestCode))
    const advisors = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        principal: thesisAccounts.lead,
      })
      .from(thesisAccounts)
      .innerJoin(
        accounts,
        and(
          eq(thesisAccounts.accountId, accounts.id),
          eq(thesisAccounts.roleId, BaseRoles.PROFESSOR)
        )
      )
      .innerJoin(thesis, eq(thesis.id, thesisAccounts.thesisThemeRequestId))
      .where(eq(thesis.requestCode, requestCode))
    const [parsedData] = generalRequestData.map((request) => ({
      ...request,
      students,
      advisors,
    }))
    return parsedData
  }

  async getthesisActions({ requestCode }: { requestCode: string }) {
    return db
      .select({
        id: thesisActions.id,
        action: thesisActions.action,
        date: thesisActions.date,
        content: thesisActions.content,
        isFile: thesisActions.isFile,
        actor: sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
        role: roles.name,
      })
      .from(thesisActions)
      .innerJoin(accounts, eq(thesisActions.accountId, accounts.id))
      .innerJoin(thesis, eq(thesis.id, thesisActions.requestId))
      .innerJoin(roles, eq(thesisActions.roleId, roles.id))
      .where(eq(thesis.requestCode, requestCode))
  }

  async insertThemeRequestAction(
    params: Omit<ThesisActionsSchema, 'requestId'> & {
      requestCode: string
    }
  ) {
    const [{ requestId }] = await db
      .select({
        requestId: thesis.id,
      })
      .from(thesis)
      .where(eq(thesis.requestCode, params.requestCode))
    await db.insert(thesisActions).values({ ...params, requestId })
    if (params.roleId === BaseRoles.ADMIN && params.action === 'approved')
      await this.completeThesisRequest({ requestCode: params.requestCode })
  }

  async createThesisThemeRequest(newThesisTheme: CreateThesisDTO) {
    const getAccountsIds = async (accountsCode: string): Promise<string> => {
      const [{ id }] = await db
        .select({
          id: accounts.id,
        })
        .from(accounts)
        .where(eq(accounts.code, accountsCode))
      return id
    }
    return await db.transaction(async (tx) => {
      const { students, advisors, ...newThesis } = newThesisTheme

      const applicantId = await getAccountsIds(newThesis.applicantCode)
      const studentsIds = await Promise.all(
        students.map((student) => getAccountsIds(student))
      )
      const advisorsIds = await Promise.all(
        advisors.map((advisor) => getAccountsIds(advisor))
      )
      let thesisCode
      while (true) {
        thesisCode = generateThesisCode()
        const [thesisExists] = await db
          .select({ id: thesis.id })
          .from(thesis)
          .where(eq(thesis.requestCode, thesisCode))
        if (!thesisExists?.id) break
      }

      const [{ thesisId }] = await tx
        .insert(thesis)
        .values({
          ...newThesis,
          applicantId,
          requestCode: thesisCode,
        })
        .returning({ thesisId: thesis.id })
      let accountsFormat: ThesisAccountsSchema[] = []
      studentsIds.forEach((student) => {
        accountsFormat.push({
          thesisThemeRequestId: thesisId,
          accountId: student,
          roleId: BaseRoles.STUDENT,
          lead: false,
        })
      })
      advisorsIds.forEach((advisor) => {
        accountsFormat.push({
          thesisThemeRequestId: thesisId,
          accountId: advisor,
          roleId: BaseRoles.PROFESSOR,
          lead: false,
        })
      })
      await tx.insert(thesisAccounts).values(accountsFormat)
      const [{ historyId }] = await tx
        .insert(thesisActions)
        .values({
          requestId: thesisId,
          accountId: applicantId,
          roleId: BaseRoles.STUDENT,
          action: 'sended',
          content: 'Solicitud enviada',
        })
        .returning({
          historyId: thesisActions.id,
        })
    await tx.update(thesis)
        .set({ lastActionId: historyId })
        .where(eq(thesis.id, thesisId))
      return { thesisCode, historyId }
    })
  }

  async completeThesisRequest({ requestCode }: { requestCode: string }) {
    await db
      .update(thesis)
      .set({
        aproved: true,
      })
      .where(eq(thesis.requestCode, requestCode))
      .returning({ id: thesis.id })
  }
}

export default ThesisThemeService
