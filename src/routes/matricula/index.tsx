
import Enrollments from '@/enrollment/views/Enrollment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matricula/')({
  component: () => <Enrollments/>,
})
