import { createFileRoute } from '@tanstack/react-router'
import Externs from '@/modules/users/views/Externs'

export const Route = createFileRoute('/_auth/usuarios/externos')({
  //TODO: Implement loader
  component: () => <Externs />,
})
