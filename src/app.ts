import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { errorHandler, notFound } from './middlewares'
import { Route } from './interfaces/route'
import { G_CLIENT_ID, G_CLIENT_SECRET, PORT, SECRET_KEY } from './config'
import { showRoutes } from 'hono/dev'
import { googleAuth } from '@hono/oauth-providers/google'
import { jwt } from 'hono/jwt'
import { authRoute, oauthRoute } from './auth'

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
      '/oauth',
      googleAuth({
        client_id: G_CLIENT_ID,
        client_secret: G_CLIENT_SECRET,
        scope: ['email', 'profile', 'openid'],
      })
    )
    this.app.use('/auth/*', jwt({ secret: SECRET_KEY! }))
  }

  private initializeRoutes(routes: Route[]) {
    this.app.get('/', async (c) => c.text('Hola PUCP! Aquí disfrutando'))
    routes.forEach((route) => {
      console.log(`Route ${route.path} initialized`)
      this.app.route(route.path, route.router)
    })
    this.app.route('/oauth', oauthRoute)
    this.app.route('/auth', authRoute)
    showRoutes(this.app, {
      colorize: true,
      verbose: true,
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
