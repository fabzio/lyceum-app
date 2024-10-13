import { createFileRoute } from '@tanstack/react-router'
import CourseManagment from '@/modules/study-plans/views/CoursesManagment/CourseManagment'

export const Route = createFileRoute('/_auth/plan-de-estudios/')({
  component: () => <CourseManagment />,
})
