import { Hono } from 'hono'
import { AdministrativeService } from '../services'

class AdministrativeController {
  private router = new Hono()
  private administrativeService = new AdministrativeService()

  //TODO Add methods here
}

export default AdministrativeController
