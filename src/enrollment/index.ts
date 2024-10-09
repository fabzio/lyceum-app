import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { EnrollmentRoute } from './routes'

class Enrollment implements Route {
  public path = '/enrollments'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new EnrollmentRoute()]
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'enrollment module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}
export default Enrollment
