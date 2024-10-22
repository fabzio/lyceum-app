import { Route } from '@/interfaces/route'
import { Hono } from 'hono'

class ExternalRoute implements Route {
  public path = '/externals'
  public router = new Hono()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // Add route initializations here
  }
}

export default ExternalRoute
