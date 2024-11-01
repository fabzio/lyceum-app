import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ScheduleDistributionController } from '../controllers'

class ScheduleDistributionRoute implements Route {
  public path = '/schedule-distribution'
  public router = new Hono()

  private scheduleDistributionController = new ScheduleDistributionController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(
      '/',
      this.scheduleDistributionController.insertProfessorToScheduleProposal
    )
  }
}
export default ScheduleDistributionRoute
