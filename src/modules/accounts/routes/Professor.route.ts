import { Route } from '@/interfaces/route'
import { Hono } from 'hono'
import { ProfessorController } from '../controllers'

class ProfessorRoute implements Route {
  public path = '/professors'
  public router = new Hono()
  private professorControler = new ProfessorController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route('/', this.professorControler.getProfessors)
  }
}

export default ProfessorRoute
