import { createFileRoute } from '@tanstack/react-router'
import Estudiantes from '@/modules/users/views/Students'

export const Route = createFileRoute('/_auth/usuarios/')({
  component: () => <Estudiantes />,
})
