import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { AdministrativeController } from '../controllers'

class AdministrativeRoute implements Route {
  public path = '/admins'
  public router = new Hono()
  public administrativeController = new AdministrativeController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    //Acá colocamos todas las funciones que tiene el controlador de administrativos
    this.router.route(
      '/',
      this.administrativeController.getAdministrativeDetail
    )
  }
}

export default AdministrativeRoute
