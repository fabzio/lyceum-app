import { createFileRoute } from '@tanstack/react-router'
import Administratives from '@/modules/users/views/Administratives'

export const Route = createFileRoute('/_auth/usuarios/administrativos')({
  //TODO: Implement loader
  component: () => <Administratives />,
})
