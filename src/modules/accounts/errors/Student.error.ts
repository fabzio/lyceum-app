import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const StudenNotFoundError = createErrorFactory(
  'StudenNotFoundError',
  404
)
