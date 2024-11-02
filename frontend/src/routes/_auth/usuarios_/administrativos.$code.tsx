import TransitionPage from '@frontend/components/anim/TransitionPage'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@frontend/lib/utils'
import AdministrativeService from '@frontend/modules/users/services/Administrative.service'
import AdministrativeDetail from '@frontend/modules/users/views/Administratives/AdministrativeDetail'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/administrativos/$code')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        UserPermissionsDict.WRITE_ADMINISTRIVES,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () =>
    ({}) as {
      mode: 'create' | 'edit' | 'view'
    },
  component: () => <AdministrativeDetailPage />,
  loader: async ({ params: { code }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.ADMINISTRATIVES, code],
      queryFn: () => AdministrativeService.getAdministrativeDetail(code),
    })
  },
})

function AdministrativeDetailPage() {
  return (
    <TransitionPage>
      <AdministrativeDetail />
    </TransitionPage>
  )
}
