import TransitionPage from '@frontend/components/anim/TransitionPage'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import NewTeacherSelection from '@frontend/modules/hiring/views/TeacherSelection/NewTeacherSelection'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/nuevo'
)({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { havePermission } = sessionStore
    if (!havePermission(HiringPermissionsDict.CREATE_HIRING_PROCESS)) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <NewTeacherSelectionPage />,
})

function NewTeacherSelectionPage() {
  return (
    <TransitionPage>
      <NewTeacherSelection />
    </TransitionPage>
  )
}
