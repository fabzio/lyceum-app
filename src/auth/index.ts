import {  SECRET_KEY } from '@/config'
import GenericService from '@/modules/accounts/services/Generic.service'
import { revokeToken } from '@hono/oauth-providers/google'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { authMiddleware } from './authMiddleware'
import { CookieOptions } from 'hono/utils/cookie'

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
      setCookie(
        c,
        'lyceum-tkn',
        await sign(
          {
            ...payload,
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

export const authRoute = new Hono().get(
  '/verify',
  authMiddleware,
  async (c) => {
    const token = c.get('jwtPayload')
    if (!token) {
      c.status(401)
      return c.json({ message: 'Unauthorized', success: false })
    }
    const updatedData = await GenericService.googleLogin({
      email: token.email,
      googleId: token.googleId,
    })
    setCookie(
      c,
      'lyceum-tkn',
      await sign(
        {
          ...updatedData,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          iat: Math.floor(Date.now() / 1000),
        },
        SECRET_KEY!
      ),
      cookieOptions
    )
    return c.json({ data: updatedData, message: 'Authorized', success: true })
  }
)
