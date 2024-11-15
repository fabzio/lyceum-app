import db from '@/database'
import {
  accounts,
  courses,
  presentationLetterAccounts,
  presentationLetters,
  presentationLetterStatus,
  schedules,
} from '@/database/schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { generateRandomCode } from '@/modules/thesis/services/utils'
import { and, eq, inArray, desc, sql, asc, or, ilike, param } from 'drizzle-orm'

class PresentationLettersService {
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
      return { id: vUnitId, companyName: params.companyName }
    })
    return res
  }
}
export default PresentationLettersService
