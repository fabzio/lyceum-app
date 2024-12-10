import db from '@/database'
import {
  accounts,
  courses,
  presentationLetterAccounts,
  presentationLetters,
  presentationLetterStatus,
  schedules,
  units,
} from '@/database/schema'
import { CoursesSchema } from '@/database/schema/courses'
import { PresentationLettersSchema } from '@/database/schema/presentationLetters'
import { ScheduleSchema } from '@/database/schema/schedules'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { generateRandomCode } from '@/modules/thesis/services/utils'
import { and, eq, inArray, desc, sql, asc, or, ilike, param } from 'drizzle-orm'

class PresentationLettersService {
  public async getPresentationLetterDetail(presentationLetterId: number) {
    const presentationLetter = await db.query.presentationLetters.findFirst({
      where: (presentationLetters, { eq }) =>
        eq(presentationLetters.id, presentationLetterId),
      with: {
        schedule: {
          columns: {
            code: true,
          },
          with: {
            course: {
              columns: {
                name: true,
              },
            },
          },
        },
        accounts: {
          with: {
            account: {
              columns: {
                name: true,
                firstSurname: true,
                secondSurname: true,
                code: true,
              },
            },
          },
        },
      },
    })
    if (!presentationLetter) throw new Error('Presentation letter not found')
    return {
      ...presentationLetter,
      scheduleCode: presentationLetter.schedule.code,
      courseName: presentationLetter.schedule.course.name,

      accounts: presentationLetter.accounts.map((account) => {
        return {
          ...account.account,
        }
      }),
    }
  }
  public async createPresentationLetter(params: {
    requesterId: string
    companyName: string
    scheduleId: number
    documentId: string
    description: string
    accountsParse: Array<{
      id: string
    }>
  }) {
    const VunitIdResult = await db
      .select({
        unitId: courses.unitId,
      })
      .from(schedules)
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .where(eq(schedules.id, params.scheduleId))
    const vUnitId = VunitIdResult[0]?.unitId

    let v_requestCode
    while (true) {
      v_requestCode = generateRandomCode()
      const [presentationLetterExists] = await db
        .select({ id: presentationLetters.id })
        .from(presentationLetters)
        .where(eq(presentationLetters.requestCode, v_requestCode))
      if (!presentationLetterExists?.id) break
    }
    const res = await db.transaction(async (trx) => {
      const [{ id }] = await trx
        .insert(presentationLetters)
        .values({
          scheduleId: Number(params.scheduleId),
          unitId: vUnitId,
          requestCode: v_requestCode,
          companyName: params.companyName,
          detail: params.description,
          observation: null,
          submissionDate: new Date(),
          acceptanceDate: null,
          completionDate: null,
          documentId: params.documentId,
        })
        .returning({ id: presentationLetters.id })

      await trx.insert(presentationLetterAccounts).values({
        presentationLetterId: id,
        accountId: params.requesterId,
        roleId: BaseRoles.STUDENT,
        lead: true,
      })
      if (params.accountsParse.length > 0) {
        await trx.insert(presentationLetterAccounts).values(
          params.accountsParse.map((account) => ({
            presentationLetterId: id,
            accountId: account.id,
            roleId: BaseRoles.STUDENT,
            lead: false,
          }))
        )
      }
      return { id, companyName: params.companyName }
    })
    return res
  }

  public async getPresentationLetterByUnit(params: {
    UnitId: number
  }): Promise<
    (Pick<
      PresentationLettersSchema,
      'id' | 'companyName' | 'submissionDate' | 'status'
    > &
      Pick<CoursesSchema, 'id' | 'name' | 'code'> &
      Pick<ScheduleSchema, 'id' | 'code'>)[]
  > {
    const letterInUnitListQuery = await db
      .select({
        letterid: presentationLetters.id,
        companyName: presentationLetters.companyName,
        submissionDate: presentationLetters.submissionDate,
        status: presentationLetters.status,
        scheduleId: schedules.id,
        schedulesCode: schedules.code,
        courseId: courses.id,
        coursesName: courses.name,
        coursesCode: courses.code,
      })
      .from(presentationLetters)
      .innerJoin(schedules, eq(presentationLetters.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(units, eq(courses.unitId, units.id))
      .innerJoin(
        presentationLetterAccounts,
        and(
          eq(presentationLetterAccounts.lead, true),
          eq(
            presentationLetterAccounts.presentationLetterId,
            presentationLetters.id
          )
        )
      )
      .innerJoin(
        accounts,
        eq(presentationLetterAccounts.accountId, accounts.id)
      )
      .where(
        or(eq(accounts.unitId, params.UnitId), eq(units.id, params.UnitId))
      )

    return letterInUnitListQuery.map((row) => ({
      id: row.letterid,
      companyName: row.companyName,
      submissionDate: row.submissionDate,
      status: row.status,
      scheduleId: row.scheduleId,
      code: row.schedulesCode,
      name: row.coursesName,
      courseCode: row.coursesCode,
    }))
  }

  public async getPresentationLetterByAccount(params: { id: string }) {
    const PresentationLetterList = await db
      .selectDistinct({
        letterid: presentationLetters.id,
        companyName: presentationLetters.companyName,
        submissionDate: presentationLetters.submissionDate,
        status: presentationLetters.status,
        scheduleId: schedules.id,
        schedulesCode: schedules.code,
        courseId: courses.id,
        coursesName: courses.name,
        coursesCode: courses.code,
      })
      .from(presentationLetters)
      .innerJoin(schedules, eq(presentationLetters.scheduleId, schedules.id))
      .innerJoin(courses, eq(schedules.courseId, courses.id))
      .innerJoin(
        presentationLetterAccounts,
        eq(
          presentationLetterAccounts.presentationLetterId,
          presentationLetters.id
        )
      )
      .innerJoin(
        accounts,
        eq(presentationLetterAccounts.accountId, accounts.id)
      )
      .where(eq(accounts.id, params.id))

    return PresentationLetterList.map((row) => ({
      id: row.letterid,
      companyName: row.companyName,
      submissionDate: row.submissionDate,
      status: row.status,
      scheduleId: row.scheduleId,
      code: row.schedulesCode,
      name: row.coursesName,
      courseCode: row.coursesCode,
    }))
  }

  public async updateStatusOfAPresentationLetter(params: {
    presentationLetterID: number
    observation: string
    reviewerId: string
    status: PresentationLettersSchema['status']
  }) {
    const res = await db.transaction(async (trx) => {
      await trx
        .update(presentationLetters)
        .set({
          status: params.status,
          observation: params.observation,
          acceptanceDate: new Date(),
        })
        .where(eq(presentationLetters.id, params.presentationLetterID))

      await trx.insert(presentationLetterAccounts).values({
        presentationLetterId: params.presentationLetterID,
        accountId: params.reviewerId,
        roleId: 13,
        lead: true,
      })
    })
  }

  public async approveOrDenegateAPresentationLetter(params: {
    presentationLetterID: number
    status: PresentationLettersSchema['status']
  }) {
    const res = await db.transaction(async (trx) => {
      await trx
        .update(presentationLetters)
        .set({
          status: params.status,
          acceptanceDate: new Date(),
        })
        .where(eq(presentationLetters.id, params.presentationLetterID))
    })
  }
}
export default PresentationLettersService
