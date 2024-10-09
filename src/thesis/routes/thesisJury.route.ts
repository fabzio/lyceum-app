import { Route } from '@/interfaces/route'
import { Hono } from 'hono'

class ThesisJuryRoute implements Route {
  public path = '/jury'
  public router = new Hono()
}

export default ThesisJuryRoute
