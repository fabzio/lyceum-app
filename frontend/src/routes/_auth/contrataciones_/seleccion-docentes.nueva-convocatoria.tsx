import TransitionPage from '@frontend/components/anim/TransitionPage'
import NewHiring from '@frontend/modules/hiring/views/TeacherSelection/NewHiring'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/nueva-convocatoria'
)({
  /*Algún ejemplo de carga antes de renderizar la vista
  beforeLoad: ({ context: { sessionStore } }) => {
    const { havePermission } = sessionStore

    if (!havePermission(SecurityPermissionsDict.CREATE_ROLES)) {
      throw redirect({
        to: '/',
      })
    }
  },
  */
  component: () => (
    <TransitionPage>
      <NewHiring />
    </TransitionPage>
  ),
})
