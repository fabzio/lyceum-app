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
export const errorHandler = async (c: Context) => {
  const date = new Date()
  const logFileName = `./logs/${date.toISOString().split('T')[0]}.log`
  const newLog = `${date.toISOString()} - [${c.req.method}] ${c.req.url} - ${c.error?.name}:${c.error?.message}`
  try {
    const logs = await Bun.file(logFileName).text()
    await Bun.write(logFileName, logs.concat(`\n${newLog}`))
  } catch (error) {
    await Bun.write(logFileName, ''.concat(`${newLog}`))
  }
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
