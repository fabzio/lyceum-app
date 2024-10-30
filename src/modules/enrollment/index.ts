import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { EnrollmentModificationRoute, ScheduleProposalRoute } from './routes'

class Enrollment implements Route {
  public path = '/enrollment'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [
      new EnrollmentModificationRoute(),
      new ScheduleProposalRoute(),
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
