import { Hono } from 'hono'

export interface Route {
  path: string
  router: Hono
}
