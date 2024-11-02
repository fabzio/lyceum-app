import EnrollmentPropose from '@frontend/modules/enrollment/views/EnrollmentPropose'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/propuesta-horarios')({
  component: () => <EnrollmentPropose />,
})
