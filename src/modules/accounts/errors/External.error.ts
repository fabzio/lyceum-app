import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const ExternalNotFoundError = createErrorFactory(
  'ExternalNotFoundError',
  404
)
