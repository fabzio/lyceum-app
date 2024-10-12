import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { RiskStudentReportController } from '../controllers'

class RiskStudentReportRoute implements Route {
  public path = '/reports'
  public router = new Hono()

  private riskStudentReportController = new RiskStudentReportController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(
      '/',
      this.riskStudentReportController.getRiskStudentReport
    )
  }
}
export default RiskStudentReportRoute
