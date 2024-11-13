import TransitionPage from '@frontend/components/anim/TransitionPage'
import NewTeacherSelection from '@frontend/modules/hiring/views/TeacherSelection/NewTeacherSelection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/nuevo'
)({
  component: () => <NewTeacherSelectionPage />,
})

function NewTeacherSelectionPage() {
  return (
    <TransitionPage>
      <NewTeacherSelection />
    </TransitionPage>
  )
}
