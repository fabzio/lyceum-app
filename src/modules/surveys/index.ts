import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { authMiddleware } from '@/auth/authMiddleware'
import SurveyRoute from './routes/survey.route'

class Survey implements Route {
  public path = '/surveys'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new SurveyRoute()]
    this.initializeMiddlewares()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'Survey module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }

  private initializeMiddlewares() {
    this.router.use('/', authMiddleware)
  }
}
export default Survey
