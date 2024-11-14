import { SECRET_KEY } from '@/config'
import GenericService from '@/modules/accounts/services/Generic.service'
import { revokeToken } from '@hono/oauth-providers/google'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { authMiddleware } from './authMiddleware'
import { CookieOptions } from 'hono/utils/cookie'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const cookieOptions: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
}
export const oauthRoute = new Hono()
  .get('/', async (c) => {
    const token = c.get('token')
    const scopes = c.get('granted-scopes')
    const profile = c.get('user-google')
    if (!token || !scopes || !profile) {
      c.status(401)
      return c.redirect('/login')
    }
    try {
      const payload = await GenericService.googleLogin({
        email: profile.email!,
        googleId: profile.id!,
      })
      const { allowedModules, roles, ...cookieContent } = payload
      setCookie(
        c,
        'lyceum-tkn',
        await sign(
          {
            ...cookieContent,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            iat: Math.floor(Date.now() / 1000),
          },
          SECRET_KEY!
        ),
        cookieOptions
      )
      return c.redirect('/')
    } catch (error) {
      console.error(error)
      return c.redirect('/login')
    }
  })
  .get('/logout', async (c) => {
    const token = c.get('token')
    if (token?.token) await revokeToken(token.token)
    deleteCookie(c, 'lyceum-tkn')
    return c.redirect('/login')
  })

export const authRoute = new Hono()
  .post(
    '/signin',
    zValidator(
      'json',
      z.object({
        code: z.string(),
        password: z.string(),
      })
    ),
    async (c) => {
      const data = c.req.valid('json')
      try {
        const response = await GenericService.lyceumLogin({
          email: data.code,
          password: data.password,
        })
        const { allowedModules, roles, ...cookieContent } = response
        setCookie(
          c,
          'lyceum-tkn',
          await sign(
            {
              ...cookieContent,
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
              iat: Math.floor(Date.now() / 1000),
            },
            SECRET_KEY!
          ),
          cookieOptions
        )
        c.status(200)
        return c.json({ data: response, message: 'Authorized', success: true })
      } catch (error) {
        c.status(401)
      }
    }
  )
  .post(
    '/signup',
    zValidator(
      'json',
      z.object({
        code: z.string(),
        password: z.string(),
      })
    ),
    async (c) => {
      const data = c.req.valid('json')
      await GenericService.setAccountPassword(data)
      return c.json({ message: 'Password set', success: true })
    }
  )
  .get('/verify', authMiddleware, async (c) => {
    const token = c.get('jwtPayload')
    if (!token) {
      c.status(401)
      return c.json({ message: 'Unauthorized', success: false })
    }
    const updatedData = await GenericService.googleLogin({
      email: token.email,
      googleId: token.googleId ?? '',
    })
    const { allowedModules, roles, ...cookieContent } = updatedData
    setCookie(
      c,
      'lyceum-tkn',
      await sign(
        {
          ...cookieContent,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          iat: Math.floor(Date.now() / 1000),
        },
        SECRET_KEY!
      ),
      cookieOptions
    )
    return c.json({ data: updatedData, message: 'Authorized', success: true })
  })
