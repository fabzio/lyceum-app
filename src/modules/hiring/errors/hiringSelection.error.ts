import { createErrorFactory } from '@/middlewares/errorMiddlewares'
export const JobRequestNotFoundError = createErrorFactory(
  'JobRequestNotFoundError',
  404
)
export const InvalidStatusChangeError = createErrorFactory(
  'InvalidStatusChangeError',
  409
)
