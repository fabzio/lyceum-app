import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { HiringSelectioncontroller } from '../controllers'

class HiringSelectionRoute implements Route {
  public path = '/hiring-selection'
  public router = new Hono()

  private HiringSelectionController = new HiringSelectioncontroller()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(
      '/',
      this.HiringSelectionController.updateJobRequestStatus
    )
  }
}
export default HiringSelectionRoute
