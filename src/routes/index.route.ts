import { Hono } from 'hono'
import { Route } from '../interfaces/route'

class IndexRoute implements Route {
  public path: string = '/user'
  public router: Hono = new Hono()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', (c) => {
      return c.text('Hello, World User!')
    })
  }
}
export default IndexRoute
