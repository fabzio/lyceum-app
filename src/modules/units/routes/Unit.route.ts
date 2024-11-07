import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { UnitController } from '../controllers'

class UnitRoute implements Route {
  public path = '/units'
  public router = new Hono()
  private unitController = new UnitController()
  constructor() {
    this.initializeRoutes()
  }
  private initializeRoutes() {
    this.router.route('/', this.unitController.getUnitsByType)
  }
}
export default UnitRoute
