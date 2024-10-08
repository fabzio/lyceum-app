import { Hono } from 'hono'
import { RiskStudentReportService } from '../services'

class RiskStudentReportController {
  private router = new Hono()
  private riskStudentReportService = new RiskStudentReportService()

  public getRiskStudentReport = this.router.get('/:reportId', async (c) => {
    const { reportId } = c.req.param()
    const { studentCode, scheduleId } = c.req.query()
    console.log('reportId', reportId)

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
}
export default RiskStudentReportController
