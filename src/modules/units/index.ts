import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { authMiddleware } from '@/auth/authMiddleware'

class Units implements Route {
  public path = '/unit'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = []
    this.initializeMiddlewares()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'Units module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }

  private initializeMiddlewares() {
    this.router.use('/', authMiddleware)
  }
}
export default Units
