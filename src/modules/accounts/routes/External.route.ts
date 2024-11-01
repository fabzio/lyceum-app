import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ExternalController } from '../controllers'
class ExternalRoute implements Route {
  public path = '/externals'
  public router = new Hono()
  private externalControler = new ExternalController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.externalControler.getExternals)
  }
}

export default ExternalRoute
