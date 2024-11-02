import CreateEnrollment from '@frontend/modules/enrollment/views/EnrollmentModify/CreateEnrollment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/solicitud-matricula')({
  component: () => <CreateEnrollment />,
})