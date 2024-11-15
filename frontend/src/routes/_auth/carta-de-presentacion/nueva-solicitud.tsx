import TransitionPage from '@frontend/components/anim/TransitionPage'
// import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import NewPresentationCardForm from '@frontend/modules/presentationCard/views/PresentationCardDetail/components/PresentationCardForm'
import { createFileRoute } from '@tanstack/react-router'
//
export const Route = createFileRoute(
  '/_auth/carta-de-presentacion/nueva-solicitud'
)({
  // beforeLoad: ({ context: { sessionStore } }) => {
  // LETTER: Implementar permisos
  // const { havePermission } = sessionStore
  // if (!havePermission(ThesisPermissionsDict.CREATE_THESIS)) {
  //   throw redirect({
  //     to: '/',
  //   })
  // }
  // },
  component: () => <NewRequest />,
})
function NewRequest() {
  return (
    <TransitionPage>
      <div className="flex justify-center">
        <NewPresentationCardForm />
      </div>
    </TransitionPage>
  )
}
