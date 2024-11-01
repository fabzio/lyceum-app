import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const AlreadyApprovedError = createErrorFactory(
  'AlreadyApprovedError',
  409
)

export const NoPreviousinSentStateError = createErrorFactory(
  'NoPreviousinSentStateError',
  400
)
