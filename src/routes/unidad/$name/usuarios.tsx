import Users from '@/modules//unit/views/Users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unidad/$name/usuarios')({
  component: () => <Users />,
})
