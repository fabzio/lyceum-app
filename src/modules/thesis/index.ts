import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ThesisJuryRoute, ThesisThemeRoute } from './routes'
import { authMiddleware } from '@/auth/authMiddleware'

class Thesis implements Route {
  public path = '/thesis'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new ThesisThemeRoute(), new ThesisJuryRoute()]
    this.initializeMiddlewares()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'Thesis module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }

  private initializeMiddlewares() {
    this.router.use('/', authMiddleware)
  }
}
export default Thesis
