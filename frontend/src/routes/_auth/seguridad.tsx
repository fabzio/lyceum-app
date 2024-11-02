import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@frontend/components/anim/TransitionPage'
import Security from '@frontend/modules/security'

export const Route = createFileRoute('/_auth/seguridad')({
  component: () => <SecurityPage />,
})

function SecurityPage() {
  return (
    <TransitionPage>
      <Security />
    </TransitionPage>
  )
}
