import TransitionPage from '@/components/anim/TransitionPage'
import Unit from '@/modules/unit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unidad/$name')({
  component: UnitPage,
})

function UnitPage() {
  return (
    <TransitionPage>
      <Unit />
    </TransitionPage>
  )
}
