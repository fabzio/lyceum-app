import Users from '@frontend/modules//unit/views/Users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/unidades/secciones/$unitId/usuarios'
)({
  component: () => <Users />,
})
