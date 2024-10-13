import { createFileRoute } from '@tanstack/react-router'
import AsignRoles from '@/modules/security/views/AsignRoles'

export const Route = createFileRoute('/_auth/seguridad/')({
  component: () => <AsignRoles />,
})
