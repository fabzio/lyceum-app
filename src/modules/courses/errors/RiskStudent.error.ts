import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const RiskStudentNotFoundError = createErrorFactory(
  'RiskStudentNotFoundError',
  404
)

export const SchedulewithoutProfessorError = createErrorFactory(
  'SchedulewithoutProfessorError',
  404
)
