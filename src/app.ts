import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { errorHandler, notFound } from './middlewares'
import { Route } from './interfaces/route'
import { G_CLIENT_ID, G_CLIENT_SECRET, PORT } from './config'
import { showRoutes } from 'hono/dev'
import { googleAuth } from '@hono/oauth-providers/google'
import { authRoute, oauthRoute } from './auth'
import { authMiddleware } from './auth/authMiddleware'
import { serveStatic } from 'hono/bun'

class App {
  public app: Hono
  public port: number

  constructor(routes: Route[]) {
    this.app = new Hono()
    this.port = parseInt(PORT || '8000')
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public listen() {
    console.info(`🚀 App listening on the port ${this.port}`)
    console.info(`ENV: ${process.env.NODE_ENV}`)
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    this.app.use('/api/v1', logger(), prettyJSON())

    // Middleware para redirigir HTTP a HTTPS en producción
    if (process.env.NODE_ENV === 'production') {
      this.app.use('*', async (c, next) => {
        const proto = c.req.header('x-forwarded-proto')
        if (proto && proto !== 'https') {
          const httpsUrl = `https://${c.req.header('host')}${c.req.url}`
          return c.redirect(httpsUrl, 301)
        }
        await next()
      })
    }

    this.app.use(
      '/api/v1/oauth',
      googleAuth({
        client_id: G_CLIENT_ID,
        client_secret: G_CLIENT_SECRET,
        scope: ['email', 'profile', 'openid'],
        redirect_uri:
          process.env.NODE_ENV === 'development'
            ? `http://localhost:${this.port}/api/v1/oauth`
            : 'https://lyceum.inf.pucp.edu.pe/api/v1/oauth',
      })
    )
    this.app.use('/api/v1/auth/verify', authMiddleware)
  }

  private initializeRoutes(routes: Route[]) {
    const lyceumRoutes = new Hono().basePath('/api/v1')
    lyceumRoutes.get('/', (c) => c.json({ message: 'Welcome to Lyceum API' }))
    routes.forEach((route) => {
      console.log(`Route ${route.path} initialized`)
      lyceumRoutes.route(route.path, route.router)
    })
    lyceumRoutes.route('/oauth', oauthRoute)
    lyceumRoutes.route('/auth', authRoute)
    this.app.route('/', lyceumRoutes)
    this.app.get('*', serveStatic({ root: './frontend/dist' }))
    this.app.get('*', serveStatic({ path: './frontend/dist/index.html' }))
    showRoutes(lyceumRoutes, {
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
