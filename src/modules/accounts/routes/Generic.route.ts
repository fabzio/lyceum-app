import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { GenericController } from '../controllers'

class GenericRoute implements Route {
  public path = '/generic'
  public router = new Hono()
  private genericController = new GenericController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.genericController.getAccount)
    this.router.route('/', this.genericController.getAccountsBySchedule)
    this.router.route('/sign-up/:googleId', this.genericController.postAccount)
  }
}

export default GenericRoute
