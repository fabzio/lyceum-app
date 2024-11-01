import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const StudenNotFoundError = createErrorFactory(
  'StudentNotFoundError',
  404
)

export const DuplicatedStudentCode = createErrorFactory(
  'DuplicatedStudentCode',
  409
)