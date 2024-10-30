import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const AlreadyApprovedError = createErrorFactory(
  'AlreadyApprovedError',
  404
)

export const NoPreviousinSentStateError = createErrorFactory(
  'NoPreviousinSentStateError',
  404
)
