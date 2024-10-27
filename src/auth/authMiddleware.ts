import { SECRET_KEY } from '@/config'
import { createMiddleware } from 'hono/factory'
import { jwt } from 'hono/jwt'

export const authMiddleware = createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({
    secret: SECRET_KEY!,
  })
  return jwtMiddleware(c, next)
})
