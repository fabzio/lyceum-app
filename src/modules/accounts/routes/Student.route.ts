import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { StudentController } from '../controllers'

class StudentRoute implements Route {
  public path = '/students'
  public router = new Hono()
  private studentController = new StudentController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.studentController.getStudentDetail)
    this.router.route('/', this.studentController.getStudents)
    //this.router.route('/', this.studentController.createStudent)
  }
}
export default StudentRoute
