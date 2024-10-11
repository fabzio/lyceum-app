import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { EnrollmentModificationController } from '../controllers'

class EnrollmentModificationRoute implements Route {
  public path = '/modifications'
  public router = new Hono()

  private enrollmentController = new EnrollmentModificationController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.enrollmentController.getEnrollments)
  }
}
export default EnrollmentModificationRoute
