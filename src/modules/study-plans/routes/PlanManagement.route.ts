import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { PlanManagementController } from '../controllers'

class PlanManagementRoute implements Route {
  public path = '/plan-management'
  public router = new Hono()

  private planController = new PlanManagementController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.planController.getPlans)
  }
}
export default PlanManagementRoute
