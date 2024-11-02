import { createFileRoute, redirect } from '@tanstack/react-router'
import Profesors from '@frontend/modules/users/views/Externs'
import { ExternsFilters } from '@frontend/modules/users/views/Externs/interfaces/CourseFIlters'
import { QueryKeys } from '@frontend/constants/queryKeys'
import ExternService from '@frontend/modules/users/services/Extern.service'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@frontend/lib/utils'

export const Route = createFileRoute('/_auth/usuarios/externos')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        UserPermissionsDict.READ_EXTERNALS,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as ExternsFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.EXTERNS, {}],
      queryFn: () => ExternService.fetchExterns({}),
    })
  },
  component: () => <Profesors />,
})
