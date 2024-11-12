import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const HiringNotFoundError = createErrorFactory(
  'HiringNotFoundError',
  404
)

export const JobRequestNotFoundError = createErrorFactory(
  'JobRequestNotFoundError',
  404
)
export const InvalidStatusChangeError = createErrorFactory(
  'InvalidStatusChangeError',
  409
)

export const CourseHiringNotFoundError = createErrorFactory(
  'CourseHiringNotFoundError',
  404
)
