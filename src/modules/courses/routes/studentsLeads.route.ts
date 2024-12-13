import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { StudentsLeadsController } from '../controllers'

class LeadsStudentsRoute implements Route {
  public path = '/lead-students'
  public router = new Hono()

  private StudentLeadsController = new StudentsLeadsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(
      '/',
      this.StudentLeadsController.getLeadsStudentsOfSpecility
    )
  }
}
export default LeadsStudentsRoute
