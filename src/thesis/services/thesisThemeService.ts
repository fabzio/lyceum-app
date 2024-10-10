import db from '@/database'
import {
  accounts,
  roles,
  thesisActions,
  thesis,
  units,
} from '@/database/schema'
import { thesisAccounts } from '@/database/schema/thesisAccounts'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { and, eq, sql } from 'drizzle-orm'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'
import { thesisActionsSchema } from '@/database/schema/thesisActions'

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
    params: thesisActionsSchema & {
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
  }
}

export default ThesisThemeService
