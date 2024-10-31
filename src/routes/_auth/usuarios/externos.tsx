import { createFileRoute, redirect } from '@tanstack/react-router'
import Profesors from '@/modules/users/views/Externs'
import { ExternsFilters } from '@/modules/users/views/Externs/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import ExternService from '@/modules/users/services/Extern.service'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@/lib/utils'

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
