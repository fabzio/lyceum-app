export type AccountInfo = {
  id: string
  email: string
  name: string
  surname: string
  code: string
  googleId: string
  term: {
    id: number
    name: string
  }
}

declare module 'hono' {
  interface ContextVariableMap {
    jwtPayload: AccountInfo
  }
}
