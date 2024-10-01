import { Permission } from '@/interfaces/models/Permission'
import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import RolePermissionsController from '../controllers/role-permissions.controller'

class RolePermissionsRoute implements Route {
  public path = '/role-permissions'
  public router = new Hono()

  private rolepermissionController = new RolePermissionsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.rolepermissionController.getRolePermissions)
    this.router.route('/', this.rolepermissionController.insertRolePermission)
  }
}
export default RolePermissionsRoute
