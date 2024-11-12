import ManagementPracticeHeads from '@frontend/modules/hiring/views/ManagementPracticeHeads'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/gestion-jefes-practica'
)({
  component: () => <ManagementPracticeHeads />,
})
