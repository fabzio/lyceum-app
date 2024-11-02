export type CourseProposal = {
  code: string
  courseId: string
  courseName: string
  vacants: number
  visibility: CourseProposalVisibility
}

export enum CourseProposalVisibility {
  visible,
  hidden
}