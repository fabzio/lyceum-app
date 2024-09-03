import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { errorHandler, notFound } from './middlewares'
import { Route } from './interfaces/route'
import { PORT } from './config'

class App {
  public app: Hono
  public port: number

  constructor(routes: Route[]) {
    this.app = new Hono().basePath('/api/v1')
    this.port = parseInt(PORT || '8000')
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public listen() {
    console.info(`🚀 App listening on the port ${this.port}`)
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    this.app.use('*', logger(), prettyJSON())
    this.app.use(
      '*',
      cors({
        origin: '*',
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      })
    )
  }

  private initializeRoutes(routes: Route[]) {
    this.app.get('/', async (c) => c.text('Hola PUCP! Aquí disfrutando'))
    routes.forEach((route) => {
      console.log(`Route ${route.path} initialized`)
      this.app.route(route.path, route.router)
    })
  }

  private initializeErrorHandling() {
    this.app.onError((err, c) => {
      console.error(err)
      return errorHandler(c)
    })
    this.app.notFound((c) => {
      return notFound(c)
    })
  }
}

export default App
