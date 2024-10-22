import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@/components/anim/TransitionPage'
import Users from '@/modules/users'

export const Route = createFileRoute('/_auth/usuarios')({
  component: () => <UsersPage />,
})

function UsersPage() {
  return (
    <TransitionPage>
      <Users />
    </TransitionPage>
  )
}
