import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import EnrollmentController from '../../enrollment/controllers/enrollment.controller'

class EnrollmentRoute implements Route {
  public path = '/enrollments'
  public router = new Hono()

  private enrollmentController = new EnrollmentController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.enrollmentController.getEnrollments)
  }
}
export default EnrollmentRoute
