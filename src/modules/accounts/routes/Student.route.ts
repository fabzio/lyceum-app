import { Route } from '@/interfaces/route'
import { Hono } from 'hono'

class StudentRoute implements Route {
  public path = '/students'
  public router = new Hono()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // TODO Add route initializations here
  }
}
export default StudentRoute
