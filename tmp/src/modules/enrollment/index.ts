import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import {
  EnrollmentModificationRoute,
  ScheduleProposalRoute,
  ScheduleDistributionRoute,
  EnrollmentApprovalRoute,
} from './routes'
import { ne } from 'drizzle-orm'

class Enrollment implements Route {
  public path = '/enrollment'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [
      new EnrollmentModificationRoute(),
      new ScheduleProposalRoute(),
      new ScheduleDistributionRoute(),
      new EnrollmentApprovalRoute(),
    ]
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'enrollmentModifications module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}
export default Enrollment
