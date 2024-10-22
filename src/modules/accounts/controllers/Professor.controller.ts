import { Hono } from 'hono'
import { ProfessorService } from '../services'

class ProfessorController {
  private router = new Hono()
  private professorService = new ProfessorService()

  // TODO Add methods here
}

export default ProfessorController
