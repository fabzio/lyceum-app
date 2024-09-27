import { createFileRoute } from '@tanstack/react-router'
import ManageRoles from '@/security/views/ManageRoles' 

export const Route = createFileRoute('/seguridad/roles')({
  component: () => <ManageRoles/>
})