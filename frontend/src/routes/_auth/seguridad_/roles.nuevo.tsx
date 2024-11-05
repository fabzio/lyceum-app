import TransitionPage from '@frontend/components/anim/TransitionPage'
import { SecurityPermissionsDict } from '@frontend/interfaces/enums/permissions/Security'
import NewRole from '@frontend/modules/security/views/ManageRoles/NewRole'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/seguridad/roles/nuevo')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { havePermission } = sessionStore

    if (!havePermission(SecurityPermissionsDict.CREATE_ROLES)) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => (
    <TransitionPage>
      <NewRole />
    </TransitionPage>
  ),
})
