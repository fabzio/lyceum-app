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
      // Intentar obtener o crear cuenta
      let payload
      try {
        // Intentar login con la cuenta de Google
        payload = await GenericService.googleLogin({
          email: profile.email!,
          googleId: profile.id!,
        })
      } catch (error) {
        // Si no se encuentra, proceder con el registro
        payload = {
          email: profile.email!,
          googleId: profile.id!,
          name: profile.given_name || '', // Nombre desde Google
          firstSurname: profile.family_name || '', // Apellido desde Google
        }
        const queryString = new URLSearchParams(payload).toString()
        return c.redirect(`/sign-in?${queryString}`)
      }

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
  }) // Código para el endpoint de logout
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

    authRoute.post(
      '/complete-profile/:accountId',
      zValidator(
        'json',
        z.object({
          phone: z.string(),
          secondaryPhone: z.string().optional(),
          identityType: z.enum(['passport', 'national_id']),
          CUI: z.string(),
        })
      ),
      async (c) => {
        const accountId = c.req.param('accountId') // Extraer el accountId de los parámetros de la URL
        const data = c.req.valid('json')

        try {
          // Llamar al método de `GenericService` para guardar la información de contacto
          const response = await GenericService.saveContactInfo({
            accountId,
            ...data,
          })
          return c.json(response)
        } catch (error) {
          c.status(500)
          return c.json({
            message: 'Failed to save contact information',
            success: false,
          })
        }
      }
    )

    // Ruta PUT para actualizar la información de contacto con accountId en la URL
    authRoute.put(
      '/update-contact-info/:accountId',
      zValidator(
        'json',
        z.object({
          phone: z.string().optional(),
          secondaryPhone: z.string().optional(),
          identityType: z.enum(['passport', 'national_id']).optional(),
          CUI: z.string().optional(),
        })
      ),
      async (c) => {
        const accountId = c.req.param('accountId') // Extraer el accountId de los parámetros de la URL
        const data = c.req.valid('json')

        try {
          // Llamar al método de `GenericService` para actualizar la información de contacto
          const response = await GenericService.updateContactInfo({
            accountId,
            ...data,
          })
          return c.json(response)
        } catch (error) {
          c.status(500)
          return c.json({
            message: 'Failed to update contact information',
            success: false,
          })
        }
      }
    )
  })
