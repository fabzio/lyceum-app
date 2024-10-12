import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { CourseController } from '../controllers'

class CourseRoute implements Route {
  public path = '/courses'
  public router = new Hono()

  private courseController = new CourseController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.courseController.getCourses)
    this.router.route('/', this.courseController.getCoursesDetail)
  }
}
export default CourseRoute
