import { Permission } from '@/interfaces/models/Permission'
import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { PermissionController } from '../controllers'

class PermissionRoute implements Route {
  public path = '/permissions'
  public router = new Hono()

  private permissionController = new PermissionController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.permissionController.getPermissions)
  }
}
export default PermissionRoute
