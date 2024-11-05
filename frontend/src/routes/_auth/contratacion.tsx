import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@frontend/components/anim/TransitionPage'
import Hiring from '@frontend/modules/hiring'

export const Route = createFileRoute('/_auth/contratacion')({
  component: () => <HiringPage />,
})
function HiringPage() {
  return (
    <TransitionPage>
      <Hiring />
    </TransitionPage>
  )
}
