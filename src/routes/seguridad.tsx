import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@/components/anim/TransitionPage'
import Security from '@/security'

export const Route = createFileRoute('/seguridad')({
  component: () => <SecurityPage />,
})
function SecurityPage() {
  return (
    <TransitionPage>
      <Security />
    </TransitionPage>
  )
}

