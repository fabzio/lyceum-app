import { Context } from 'hono'
import { StatusCode } from 'hono/utils/http-status'
export class LyceumError extends Error {
  public code: StatusCode
  constructor(message: string, code: StatusCode, name: string) {
    super(message)
    this.name = name
    this.code = code
  }
}
export const createErrorFactory = function (name: string, code: StatusCode) {
  return class extends LyceumError {
    constructor(message: string) {
      super(message, code, name)
    }
  }
}

// Error Handler
export const errorHandler = (c: Context) => {
  return c.json({
    success: false,
    message: c.error?.message || 'Internal Server Error',
  } as ResponseAPI)
}

// Not Found Handler
export const notFound = (c: Context) => {
  return c.json({
    success: false,
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  } as ResponseAPI)
}
