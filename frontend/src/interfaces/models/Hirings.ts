export interface Hirings {
  id: string
  name: string
  endDate: string
  cant_courses: number
  courses: {
    id: number
    courseName: string
  }[]
}
