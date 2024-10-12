import { createFileRoute } from '@tanstack/react-router'
import RetirementStudents from '@/modules/courses/views/RetirementStudent'

export const Route = createFileRoute('/cursos/retiro-alumnos')({
  component: () => <RetirementStudents />,
})
