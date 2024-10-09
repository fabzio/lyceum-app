import db from '@/database'
import {
  accounts,
  roles,
  thesisThemeRequestActions,
  thesisThemeRequests,
  units,
} from '@/database/schema'
import { thesisThemeAccounts } from '@/database/schema/thesisThemeAccounts'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { and, eq, sql } from 'drizzle-orm'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'

class ThesisThemeService implements ThesisThemeDAO {
  async getThesisThemeRequest() {
    const themeRequestResponse = await db
      .select({
        code: thesisThemeRequests.requestCode,
        title: thesisThemeRequests.title,
        date: thesisThemeRequests.date,
        lastAction: {
          id: thesisThemeRequestActions.id,
          action: thesisThemeRequestActions.action,
          role: roles.name,
        },
        applicant: {
          name: sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
          code: accounts.code,
        },
      })
      .from(thesisThemeRequests)
      .innerJoin(accounts, eq(thesisThemeRequests.applicantId, accounts.id))
      .innerJoin(
        thesisThemeRequestActions,
        eq(thesisThemeRequestActions.id, thesisThemeRequests.lastActionId)
      )
      .innerJoin(roles, eq(thesisThemeRequestActions.roleId, roles.id))
    return themeRequestResponse
  }

  async getThesisThemeRequestDetail({ requestCode }: { requestCode: string }) {
    const generalRequestData = await db
      .select({
        code: thesisThemeRequests.requestCode,
        title: thesisThemeRequests.title,
        date: thesisThemeRequests.date,
        area: units.name,
        applicant: {
          name: sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
          code: accounts.code,
        },
      })
      .from(thesisThemeRequests)
      .innerJoin(accounts, eq(thesisThemeRequests.applicantId, accounts.id))
      .innerJoin(units, eq(thesisThemeRequests.areaId, units.id))
      .where(eq(thesisThemeRequests.requestCode, requestCode))

    const students = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        principal: thesisThemeAccounts.lead,
      })
      .from(thesisThemeRequests)
      .innerJoin(
        thesisThemeAccounts,
        and(
          eq(thesisThemeRequests.id, thesisThemeAccounts.thesisThemeRequestId),
          eq(thesisThemeAccounts.roleId, BaseRoles.STUDENT)
        )
      )
      .innerJoin(accounts, eq(thesisThemeAccounts.accountId, accounts.id))
      .where(eq(thesisThemeRequests.requestCode, requestCode))
    const advisors = await db
      .select({
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        principal: thesisThemeAccounts.lead,
      })
      .from(thesisThemeAccounts)
      .innerJoin(
        accounts,
        and(
          eq(thesisThemeAccounts.accountId, accounts.id),
          eq(thesisThemeAccounts.roleId, BaseRoles.PROFESSOR)
        )
      )
      .innerJoin(
        thesisThemeRequests,
        eq(thesisThemeRequests.id, thesisThemeAccounts.thesisThemeRequestId)
      )
      .where(eq(thesisThemeRequests.requestCode, requestCode))
    return generalRequestData.map((request) => ({
      ...request,
      students,
      advisors,
    }))
  }

  async getThesisThemeRequestActions({ requestCode }: { requestCode: string }) {
    return db
      .select({
        id: thesisThemeRequestActions.id,
        action: thesisThemeRequestActions.action,
        date: thesisThemeRequestActions.date,
        content: thesisThemeRequestActions.content,
        isFile: thesisThemeRequestActions.isFile,
        actor: sql<string>`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${accounts.secondSurname})`,
        role: roles.name,
      })
      .from(thesisThemeRequestActions)
      .innerJoin(accounts, eq(thesisThemeRequestActions.accountId, accounts.id))
      .innerJoin(
        thesisThemeRequests,
        eq(thesisThemeRequests.id, thesisThemeRequestActions.requestId)
      )
      .innerJoin(roles, eq(thesisThemeRequestActions.roleId, roles.id))
      .where(eq(thesisThemeRequests.requestCode, requestCode))
  }
}

export default ThesisThemeService
