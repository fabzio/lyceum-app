import { createFileRoute } from '@tanstack/react-router'
import AsignRoles from '@/security/views/AsignRoles'

export const Route = createFileRoute('/seguridad/')({
  component: () => <AsignRoles/>
})