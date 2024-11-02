import TransitionPage from '@frontend/components/anim/TransitionPage'
import Unit from '@frontend/modules/unit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidad/$name')({
  component: UnitPage,
})

function UnitPage() {
  return (
    <TransitionPage>
      <Unit />
    </TransitionPage>
  )
}
