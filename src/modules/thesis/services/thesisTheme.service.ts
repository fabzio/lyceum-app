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
import { and, asc, eq, sql } from 'drizzle-orm'
import { ThesisThemeDAO } from '../dao/thesisThemeDAO'
import { ThesisActionsSchema } from '@/database/schema/thesisActions'
import { CreateThesisDTO } from '../dto/ThesisThemeDTO'
import { ThesisThemeRequestNotFound } from '../errors'
import { generateThesisCode, getAccountsIds } from './utils'

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
        phase: thesis.aprovationPhase,
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

    if (!generalRequestData.length)
      throw new ThesisThemeRequestNotFound('Tesis no encontrada')

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
    if (!advisors.length)
      throw new ThesisThemeRequestNotFound('Asesores no encontrados')

    const [parsedData] = generalRequestData.map((request) => ({
      ...request,
      students,
      advisors,
    }))
    return parsedData
  }

  async getThesisActions({ requestCode }: { requestCode: string }) {
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
      .orderBy(asc(thesisActions.date))
  }

  async insertThemeRequestAction(
    params: Omit<ThesisActionsSchema, 'requestId'> & {
      requestCode: string
    }
  ) {
    const thesisToInsert = await db
      .select({
        requestId: thesis.id,
        phase: thesis.aprovationPhase,
      })
      .from(thesis)
      .where(eq(thesis.requestCode, params.requestCode))

    if (!thesisToInsert.length)
      throw new ThesisThemeRequestNotFound(
        'Tesis a insertar acción no encontrada'
      )

    const [{ requestId, phase }] = thesisToInsert
    await db.transaction(async (tx) => {
      const [{ actionInsertId }] = await tx
        .insert(thesisActions)
        .values({ ...params, requestId })
        .returning({
          actionInsertId: thesisActions.id,
        })

      if (params.action === 'denied') {
        await tx
          .update(thesis)
          .set({ aprovationPhase: 0 })
          .where(eq(thesis.id, requestId))
      } else if (params.action === 'approved') {
        if (phase < 3) {
          await tx
            .update(thesis)
            .set({ aprovationPhase: phase + 1 })
            .where(eq(thesis.id, requestId))
        } else {
          await tx
            .update(thesis)
            .set({ aproved: true, aprovationPhase: 4 })
            .where(eq(thesis.id, requestId))
        }
      } else if (params.action === 'sended') {
        await tx
          .update(thesis)
          .set({ aprovationPhase: 1 })
          .where(eq(thesis.id, requestId))
      }
      await tx
        .update(thesis)
        .set({ lastActionId: actionInsertId })
        .where(eq(thesis.id, requestId))
    })
  }

  async createThesisThemeRequest(newThesisTheme: CreateThesisDTO) {
    return await db.transaction(async (tx) => {
      const { students, advisors, ...newThesis } = newThesisTheme

      const applicantId = await getAccountsIds(newThesis.applicantCode)
      if (!applicantId)
        throw new ThesisThemeRequestNotFound('Solicitante no encontrado')
      const studentsIds = await Promise.all(
        students.map((student) => getAccountsIds(student))
      )
      if (studentsIds.length !== students.length)
        throw new ThesisThemeRequestNotFound('Coautores no encontrados')
      const advisorsIds = await Promise.all(
        advisors.map((advisor) => getAccountsIds(advisor))
      )
      if (advisorsIds.length !== advisors.length)
        throw new ThesisThemeRequestNotFound('Asesores no encontrados')
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
      await tx
        .update(thesis)
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
  }
}

export default ThesisThemeService
