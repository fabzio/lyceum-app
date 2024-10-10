import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ThesisJuryRoute, ThesisThemeRoute } from './routes'

class Thesis implements Route {
  public path = '/thesis'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new ThesisThemeRoute(), new ThesisJuryRoute()]
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
}
export default Thesis
