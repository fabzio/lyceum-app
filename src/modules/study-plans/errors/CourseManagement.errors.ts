import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const DuplicatedCourseCode = createErrorFactory(
  'DuplicatedCourseCode',
  409
)
