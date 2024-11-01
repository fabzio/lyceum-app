import TransitionPage from '@/components/anim/TransitionPage'
import { createFileRoute } from '@tanstack/react-router'
import Thesis from '@/modules/thesis'

export const Route = createFileRoute('/_auth/tesis')({
  component: () => <TesisPage />,
})

function TesisPage() {
  return (
    <TransitionPage>
      <Thesis />
    </TransitionPage>
  )
}
