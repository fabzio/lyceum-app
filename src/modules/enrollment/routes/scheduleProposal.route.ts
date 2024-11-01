import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ScheduleProposalController } from '../controllers'

class ScheduleProposalRoute implements Route {
  public path = '/schedule-proposal'
  public router = new Hono()

  private scheduleProposalController = new ScheduleProposalController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(
      '/',
      this.scheduleProposalController.insertCourseToScheduleProposal,
      
    )
  }
}
export default ScheduleProposalRoute
