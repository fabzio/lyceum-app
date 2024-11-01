import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ModuleController } from '../controllers'

class ModuleRoute implements Route {
  public path = '/modules'
  public router = new Hono()

  private moduleController = new ModuleController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.moduleController.getModules)
  }
}
export default ModuleRoute
