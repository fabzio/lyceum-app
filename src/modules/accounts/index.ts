import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import {
  StudentRoute,
  ProfessorRoute,
  AdministrativeRoute,
  ExternalRoute,
} from './routes'

class Accounts implements Route {
  public path = '/accounts'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [
      new StudentRoute(),
      new ProfessorRoute(),
      new AdministrativeRoute(),
      new ExternalRoute(),
    ]
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'accounts module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}

export default Accounts
