import db from '@/database'
import { accounts, riskStudentReports, riskStudents } from '@/database/schema'
import { and, desc, eq } from 'drizzle-orm'
import { InsertRiskStudentReportDTO } from '../dto/riskStudentReportDTO'

class RiskStudentReportService {
  public async getRiskStudentReport({ reportId }: { reportId: string }) {
    return await db
      .select()
      .from(riskStudentReports)
      .where(eq(riskStudentReports.id, parseInt(reportId)))
  }

  public async getLastRiskStudentReport({
    studentCode,
    scheduleId,
  }: {
    studentCode: string
    scheduleId: string
  }) {
    const riskStudentReportResponse = await db
      .select({
        id: riskStudentReports.id,
        observation: riskStudentReports.observation,
        score: riskStudentReports.score,
      })
      .from(riskStudentReports)
      .innerJoin(
        riskStudents,
        and(
          eq(riskStudentReports.studentId, riskStudents.studentId),
          eq(riskStudentReports.scheduleId, riskStudents.scheduleId)
        )
      )
      .innerJoin(accounts, eq(riskStudents.studentId, accounts.id))
      .where(
        and(
          eq(accounts.code, studentCode),
          eq(riskStudents.scheduleId, parseInt(scheduleId))
        )
      )
      .orderBy(desc(riskStudentReports.date))
      .limit(1)
    return riskStudentReportResponse
  }

  public async insertRiskStudentReport({
    studentCode,
    scheduleId,
    score,
    observation,
  }: InsertRiskStudentReportDTO) {
    await db.transaction(async (tx) => {
      const [{ studentId }] = await tx
        .select({
          studentId: accounts.id,
        })
        .from(accounts)
        .where(eq(accounts.code, studentCode))

      await tx.insert(riskStudentReports).values({
        studentId,
        scheduleId,
        score,
        observation,
      })
      await tx.update(riskStudents).set({
        updated: true,
      })
    })
  }

  public async updateRiskStudentReport(
    listReports: {
      studentCode: string
      scheduleId: string
    }[]
  ) {
    const studentIds = (
      await Promise.all(
        listReports.map(({ studentCode }) => {
          return db
            .select({
              studentId: accounts.id,
              studentCode: accounts.code,
            })
            .from(accounts)
            .where(eq(accounts.code, studentCode))
        })
      )
    ).flat()

    const mapStudentIds = new Map(
      studentIds.map(({ studentCode, studentId }) => [studentCode, studentId])
    )

    await Promise.all(
      listReports.map((report) => {
        return db
          .update(riskStudents)
          .set({
            updated: false,
          })
          .where(
            and(
              eq(
                riskStudents.studentId,
                mapStudentIds.get(report.studentCode)!
              ),
              eq(riskStudents.scheduleId, parseInt(report.scheduleId))
            )
          )
      })
    )
  }
}

export default RiskStudentReportService
