import Roles from '@frontend/modules//unit/views/Roles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidad/$name/roles')({
  component: () => <Roles />,
})
