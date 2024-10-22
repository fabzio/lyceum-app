import { Hono } from 'hono'
import { ExternalService } from '../services'

class ExternalController {
  private router = new Hono()
  private externalService = new ExternalService()

  //TODO Add methods here
}

export default ExternalController
