import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { BlankEnv, BlankSchema } from 'hono/types'
import { FAQCategoriesController } from '../controllers'

class FAQCategoriesRoute implements Route {
  public path = '/faq-categories'
  public router = new Hono()

  private FAQCategoriesController = new FAQCategoriesController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.FAQCategoriesController.getFAQCategories)
  }
}

export default FAQCategoriesRoute
