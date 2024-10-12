import { createFileRoute } from '@tanstack/react-router'
import CourseManagment from '@/modules/study-plans/views/CoursesManagment/CourseManagment'

export const Route = createFileRoute('/plan-de-estudios/')({
  component: () => <CourseManagment />,
})
