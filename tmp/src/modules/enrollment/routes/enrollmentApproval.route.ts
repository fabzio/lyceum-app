import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { EnrollmentApprovalController } from '../controllers'

class EnrollmentModificationRoute implements Route {
  public path = '/enrollmentApproval'
  public router = new Hono()

  private enrollmentController = new EnrollmentApprovalController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(
      '/',
      this.enrollmentController.changeProposedEnrollmentToApproved
    )
  }
}
export default EnrollmentModificationRoute
