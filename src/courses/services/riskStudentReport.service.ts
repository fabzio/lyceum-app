import db from '@/database'
import { accounts, riskStudentReports, riskStudents } from '@/database/schema'
import { and, desc, eq } from 'drizzle-orm'

class RiskStudentReportService {
  public getRiskStudentReport({ reportId }: { reportId: string }) {
    return db
      .select()
      .from(riskStudentReports)
      .where(eq(riskStudentReports.id, parseInt(reportId)))
  }

  public getLastRiskStudentReport({
    studentCode,
    scheduleId,
  }: {
    studentCode: string
    scheduleId: string
  }) {
    const riskStudentReportResponse = db
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
}

export default RiskStudentReportService
