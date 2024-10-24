import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const StudenNotFoundError = createErrorFactory(
  'StudentNotFoundError',
  404
)
