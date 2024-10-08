import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { RiskStudentController } from '../controllers'

class RiskStudentRoute implements Route {
  public path = '/risk-students'
  public router = new Hono()

  private riskStudentController = new RiskStudentController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.riskStudentController.getRiskStudents)
    this.router.route('/', this.riskStudentController.getRiskStudentReports)
  }
}
export default RiskStudentRoute
