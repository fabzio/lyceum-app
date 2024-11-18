import TransitionPage from '@frontend/components/anim/TransitionPage'
import { toastNotAutorized } from '@frontend/constants/errorMessages'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import NewTeacherSelection from '@frontend/modules/hiring/views/TeacherSelection/NewTeacherSelection'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/nuevo'
)({
  beforeLoad: ({ context: { sessionStore, toaster } }) => {
    const { havePermission } = sessionStore
    const { toast } = toaster
    if (!havePermission(HiringPermissionsDict.CREATE_HIRING_PROCESS)) {
      toast(toastNotAutorized)
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
