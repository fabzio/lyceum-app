import TransitionPage from '@/components/anim/TransitionPage'
import { createFileRoute } from '@tanstack/react-router'
import Tesis from '@/thesis'

export const Route = createFileRoute('/tesis')({
  component: () => <TesisPage />,
})

function TesisPage() {
  return (
    <TransitionPage>
      <Tesis />
    </TransitionPage>
  )
}
