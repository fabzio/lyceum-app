import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { RiskStudentReportRoute, RiskStudentRoute } from './routes'

class Course implements Route {
  public path = '/courses'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new RiskStudentRoute(), new RiskStudentReportRoute()]
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'courses module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}
export default Course
