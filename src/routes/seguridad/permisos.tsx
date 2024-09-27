import { createFileRoute } from '@tanstack/react-router'
import Permissions from '@/security/views/Permissions'

export const Route = createFileRoute('/seguridad/permisos')({
  component: () => <Permissions/>
})