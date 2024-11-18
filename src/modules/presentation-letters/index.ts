import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { authMiddleware } from '@/auth/authMiddleware'
import { PresentationLettersRoute } from './routes'

class PresentationLetters implements Route {
  public path = '/presentation-letters'
  public router: Hono = new Hono()

  private routes: Route[]

  constructor() {
    this.routes = [new PresentationLettersRoute()]
    this.initializeMiddlewares()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', async (c) => {
      return c.json({ message: 'Presentation Letters module' })
    })
    this.routes.forEach((route) => {
      this.router.route(route.path, route.router)
    })
  }

  private initializeMiddlewares() {
    this.router.use('/', authMiddleware)
  }
}
export default PresentationLetters
