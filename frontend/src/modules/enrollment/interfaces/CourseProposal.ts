export type CourseProposal = {
  code: string
  courseId: string
  courseName: string
  vacants: number
  visibility: 'visible' | 'hidden'
}
