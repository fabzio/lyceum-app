import { createFileRoute } from '@tanstack/react-router'
import CourseManagment from '@/study-plans/views/CourseManagment'

export const Route = createFileRoute('/plan-de-estudios/')({
  component: () => <CourseManagment/>
})
