import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ThesisThemeController } from '../controllers'

class ThesisThemeRoute implements Route {
  public path = '/theme'
  public router = new Hono()
  private thesisThemeController = new ThesisThemeController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.thesisThemeController.getThesisThemes)
  }
}
export default ThesisThemeRoute
