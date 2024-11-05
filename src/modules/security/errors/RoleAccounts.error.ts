import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const ExistingPermissionError = createErrorFactory(
  'ExistingPermissionError',
  409
)
