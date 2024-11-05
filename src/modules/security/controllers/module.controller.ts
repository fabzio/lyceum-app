import { Hono } from 'hono'
import { ModuleDAO } from '../dao/ModuleDAO'
import { ModuleService } from '../services'

class ModuleController {
  private router = new Hono()
  private permissionService: ModuleDAO = new ModuleService()

  public getModules = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.permissionService.getAllModules(),
      message: 'Modules retrieved',
      success: true,
    }
    return c.json(response)
  })
}
export default ModuleController
