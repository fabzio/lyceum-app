import DetailEnrollment from '@/enrollment/views/EnrollmentModify/DetailEnrollment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/matricula/modificacion-matricula/$requestNumber'
)({
  component: () => <DetailEnrollment />,
})
