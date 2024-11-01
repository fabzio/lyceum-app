import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@/components/anim/TransitionPage'
import Security from '@/modules/security'

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
