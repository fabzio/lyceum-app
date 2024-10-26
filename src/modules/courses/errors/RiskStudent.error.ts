import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const RiskStudentNotFoundError = createErrorFactory(
  'RiskStudentNotFoundError',
  404
)
