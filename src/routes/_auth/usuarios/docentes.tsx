import { createFileRoute } from '@tanstack/react-router'
import Professors from '@/modules/users/views/Professors'

export const Route = createFileRoute('/_auth/usuarios/docentes')({
  //TODO: Implement loader
  component: () => <Professors />,
})
