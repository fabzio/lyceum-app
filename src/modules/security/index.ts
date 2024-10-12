import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ModuleRoute, PermissionRoute } from './routes'
import RolePermissionsRoute from './routes/role-permission.route'

class Security implements Route {
  public path = '/security'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [
      new PermissionRoute(),
      new ModuleRoute(),
      new RolePermissionsRoute(),
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
