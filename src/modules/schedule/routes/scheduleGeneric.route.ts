import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import ScheduleGenericController from '../controllers/scheduleGeneric.controller'
class ScheduleGenericRoute implements Route {
  public path = '/'
  public router = new Hono()
  private scheduleGenericController = new ScheduleGenericController()
  constructor() {
    this.initializeRoutes()
  }
  private initializeRoutes() {
    this.router.route(
      '/',
      this.scheduleGenericController.getSchedulesByCourse
    )
  }
}
export default ScheduleGenericRoute