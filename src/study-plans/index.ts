import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { CourseRoute } from './routes'

class StudyPlan implements Route {
  public path = '/study-plan'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new CourseRoute()]
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
export default StudyPlan
