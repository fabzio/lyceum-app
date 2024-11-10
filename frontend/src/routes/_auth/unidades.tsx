import TransitionPage from '@frontend/components/anim/TransitionPage'
import { Filters } from '@frontend/interfaces/types'
import Unit from '@frontend/modules/unit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidades')({
  validateSearch: () => ({}) as Filters,
  component: () => <UnitPage />,
})

function UnitPage() {
  return (
    <TransitionPage>
      <Unit />
    </TransitionPage>
  )
}
