import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ProfessorController } from '../controllers'

class ProfessorRoute implements Route {
  public path = '/professors'
  public router = new Hono()

  private professorController = new ProfessorController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.professorController.getProfessors)
    this.router.route('/', this.professorController.getProfessorDetail)
  }
}

export default ProfessorRoute
