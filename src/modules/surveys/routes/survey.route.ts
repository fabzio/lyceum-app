import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { SurveyController } from '../controllers'

class SurveyRoute implements Route {
  public path = '/survey'
  public router = new Hono()
  private unitController = new SurveyController()
  constructor() {
    this.initializeRoutes()
  }
  private initializeRoutes() {
    this.router.route('/', this.unitController.createSurvey)
  }
}
export default SurveyRoute
