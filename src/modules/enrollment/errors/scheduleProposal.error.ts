import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const RepeatedCoursesError = createErrorFactory(
  'RepeatedCoursesError',
  404
)

export const NoCoursesSendedError = createErrorFactory(
  'NoCoursesSendedError',
  404
)

export const EnrollmentProposalNotFoundError = createErrorFactory(
  'EnrollmentProposalNotFoundError',
  404
)

export const CourseAlreadyAddedError = createErrorFactory(
  'CourseAlreadyAddedError',
  404
)

export const InvalidStatusChangeError = createErrorFactory(
  'InvalidStatusChangeError',
  409
)
