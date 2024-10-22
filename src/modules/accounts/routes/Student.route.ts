import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { StudentController } from '../controllers'

class StudentRoute implements Route {
  public path = '/students'
  public router = new Hono()
  private studenController = new StudentController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.studenController.getStudentDetail)
  }
}
export default StudentRoute
