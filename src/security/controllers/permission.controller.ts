import { PermissionDAO } from '../dao/PermissionDAO'
import { PermissionService } from '../services'
import { Context, Hono } from 'hono'

class PermissionController {
  private router = new Hono()
  private permissionService: PermissionDAO = new PermissionService()

  public getPermissions = this.router.get('/', async (c) => {
    const { module } = c.req.query()
    const response: ResponseAPI = {
      data: Number(module)
        ? await this.permissionService.getPermissionByModule(Number(module))
        : await this.permissionService.getAllPermissions(),
      message: 'Permissions retrieved',
      success: true,
    }
    return c.json(response)
  })
}
export default PermissionController
