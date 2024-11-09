import { Course } from '@frontend/interfaces/models/Course'

export type CourseProposition = Course & {
  proposalID: number
  vacants: number
  numberVisible: number
  numberHidden: number
}
