import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import RoleAccountsController from '../controllers/role-accounts.controller'

class RoleAccountsRoute implements Route {
  public path = '/role-accounts'
  public router = new Hono()

  private roleAccountsController = new RoleAccountsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.roleAccountsController.getAllAccountRoles)
  }
}
export default RoleAccountsRoute
