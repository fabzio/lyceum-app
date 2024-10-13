import EnrollmentDistribution from '@/modules/enrollment/views/EnrollmentDistribution'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/propuesta')({
  component: () => <EnrollmentDistribution />,
})
