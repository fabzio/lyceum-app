import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import {
  ModuleRoute,
  PermissionRoute,
  RoleAccountsRoute,
  RolePermissionsRoute,
} from './routes'

class Security implements Route {
  public path = '/security'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [
      new PermissionRoute(),
      new ModuleRoute(),
      new RolePermissionsRoute(),
      new RoleAccountsRoute(),
    ]
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'Security module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}
export default Security
