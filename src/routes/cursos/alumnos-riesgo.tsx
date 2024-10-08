import RiskStudents from '@/courses/views/RiskStudent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cursos/alumnos-riesgo')({
  component: () => <RiskStudents />,
})
