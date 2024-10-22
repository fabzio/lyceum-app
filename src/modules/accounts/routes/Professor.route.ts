import { Route } from '@/interfaces/route'
import { Hono } from 'hono'

class ProfessorRoute implements Route {
  public path = '/professors'
  public router = new Hono()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // Add route initializations here
  }
}

export default ProfessorRoute
