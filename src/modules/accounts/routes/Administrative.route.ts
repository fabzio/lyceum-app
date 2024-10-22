import { Route } from '@/interfaces/route'
import { Hono } from 'hono'

class AdministrativeRoute implements Route {
  public path = '/admins'
  public router = new Hono()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    //TODO Add route initializations here
  }
}

export default AdministrativeRoute
