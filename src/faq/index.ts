import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { FAQCategoriesRoute, FAQsRoute } from './routes'

class FAQ implements Route {
  public path = '/faq'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new FAQCategoriesRoute(), new FAQsRoute()]
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'FAQ Module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }
}
export default FAQ
