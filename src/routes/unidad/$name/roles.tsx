import Roles from '@/unit/views/Roles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unidad/$name/roles')({
  component: () => <Roles />,
})
