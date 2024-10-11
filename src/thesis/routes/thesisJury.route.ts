import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ThesisJuryController } from '../controllers'

class ThesisJuryRoute implements Route {
  public path = '/jury'
  public router = new Hono()
  private thesisJuryController = new ThesisJuryController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.thesisJuryController.startJuryRequest)
  }
}

export default ThesisJuryRoute
