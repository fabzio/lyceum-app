import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const ThesisJuryRequestNotFound = createErrorFactory(
  'ThesisJuryRequestNotFound',
  404
)
