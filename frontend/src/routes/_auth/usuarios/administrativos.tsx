import { createFileRoute, redirect } from '@tanstack/react-router'
import Profesors from '@/modules/users/views/Administratives'
import { AdministrativesFilters } from '@/modules/users/views/Administratives/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import AdministrativeService from '@/modules/users/services/Administrative.service'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@/lib/utils'

export const Route = createFileRoute('/_auth/usuarios/administrativos')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        UserPermissionsDict.READ_ADMINISTRIVES,
        UserPermissionsDict.WRITE_ADMINISTRIVES,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as AdministrativesFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.ADMINISTRATIVES, {}],
      queryFn: () => AdministrativeService.fetchAdministratives({}),
    })
  },
  component: () => <Profesors />,
})
