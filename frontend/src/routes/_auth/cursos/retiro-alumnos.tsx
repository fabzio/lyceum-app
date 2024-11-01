import { createFileRoute } from '@tanstack/react-router'
import RetirementStudents from '@/modules/student-process/views/RetirementStudent'

export const Route = createFileRoute('/_auth/cursos/retiro-alumnos')({
  component: () => <RetirementStudents />,
})
