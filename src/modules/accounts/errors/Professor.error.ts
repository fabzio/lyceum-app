import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const ProfessorNotFoundError = createErrorFactory(
  'ProfessorNotFoundError',
  404
)
