import { Hono } from 'hono'
import { RiskStudentReportService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { insertRiskStudentReportDTO } from '../dto/riskStudentReportDTO'

class RiskStudentReportController {
  private router = new Hono()
  private riskStudentReportService = new RiskStudentReportService()

  public getRiskStudentReport = this.router.get('/:reportId', async (c) => {
    const { reportId } = c.req.param()
    const { studentCode, scheduleId } = c.req.query()

    const response = {
      data:
        reportId !== 'null'
          ? await this.riskStudentReportService.getRiskStudentReport({
              reportId,
            })
          : await this.riskStudentReportService.getLastRiskStudentReport({
              scheduleId,
              studentCode,
            }),
      message: 'Risk student report retrieved',
      success: true,
    }
    return c.json(response)
  })

  public insertRiskStudentReport = this.router.post(
    '/',
    zValidator('json', insertRiskStudentReportDTO),
    async (c) => {
      const newReport = c.req.valid('json')

      const response = {
        data: await this.riskStudentReportService.insertRiskStudentReport(
          newReport
        ),
        message: 'Risk student report inserted',
        success: true,
      }
      return c.json(response)
    }
  )
}
export default RiskStudentReportController
