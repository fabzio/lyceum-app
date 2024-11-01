import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const StudyPlanNotFound = createErrorFactory('StudyPlanNotFound', 404)

export const CourseAlreadyExists = createErrorFactory(
  'CourseAlreadyExists',
  409
)
