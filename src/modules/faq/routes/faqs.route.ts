import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { FAQsController } from '../controllers'

class FAQsRoute implements Route {
  public path = '/faqs'
  public router = new Hono()

  private FAQsController = new FAQsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.FAQsController.getFAQs)
  }
}

export default FAQsRoute
