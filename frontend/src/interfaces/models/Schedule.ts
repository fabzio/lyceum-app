export interface Schedule {
  id: number
  code: string
  courseId: number
  termId: number
  visibility: boolean
  vacancies: number
  state: 'saved' | 'editing'
}
