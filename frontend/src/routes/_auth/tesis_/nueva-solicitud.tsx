import TransitionPage from '@frontend/components/anim/TransitionPage'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import NewThesisRequest from '@frontend/modules/thesis/views/ThesisTheme/NewThesisRequest'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/nueva-solicitud')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { havePermission } = sessionStore
    if (!havePermission(ThesisPermissionsDict.CREATE_THESIS)) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <NewRequest />,
})
function NewRequest() {
  return (
    <TransitionPage>
      <NewThesisRequest />
    </TransitionPage>
  )
}
