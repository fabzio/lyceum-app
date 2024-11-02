import { createFileRoute, redirect } from '@tanstack/react-router'
import TransitionPage from '@frontend/components/anim/TransitionPage'
import Users from '@frontend/modules/users'

export const Route = createFileRoute('/_auth/usuarios')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllowedModules } = sessionStore
    if (!getAllowedModules().includes('USERS')) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <UsersPage />,
})

function UsersPage() {
  return (
    <TransitionPage>
      <Users />
    </TransitionPage>
  )
}
