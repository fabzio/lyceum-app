import TransitionPage from '@frontend/components/anim/TransitionPage'
import Hiring from '@frontend/modules/hiring'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/contrataciones')({
  component: () => <ContratacionesPage />,
})

function ContratacionesPage() {
  return (
    <TransitionPage>
      <Hiring />
    </TransitionPage>
  )
}