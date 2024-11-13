import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { HiringSelectionRoute } from './routes'

class Hiring implements Route {
  public path = '/hiring'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new HiringSelectionRoute()]
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'HiringSelection module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}
export default Hiring
