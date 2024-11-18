import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { PresentationLetterController } from '../controllers'

class PresentationLettersRoute implements Route {
  public path = '/letters'
  public router = new Hono()
  private presentationLetterController = new PresentationLetterController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(
      '/',
      this.presentationLetterController.startPresentationLetter // Solo basta con colocar la primera función del controller
    )
  }
}

export default PresentationLettersRoute
