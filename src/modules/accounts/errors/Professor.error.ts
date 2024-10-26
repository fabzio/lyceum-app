import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const ProfessorNotFoundError = createErrorFactory(
  'ProfessorNotFoundError',
  404
)

export const DuplicatedProfessorCode = createErrorFactory(
  'DuplicatedCourseCode',
  409
)
