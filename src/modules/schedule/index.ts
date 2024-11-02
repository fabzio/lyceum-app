import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import {
  ScheduleGenericRoute
} from './routes'

class Schedule implements Route {
  public path = '/schedule'
  public router: Hono = new Hono()
  private routes: Route[]
  constructor() {
    this.routes = [
      new ScheduleGenericRoute(),
    ]
    this.initializeRoutes()
  }
  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'schedule module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}
export default Schedule