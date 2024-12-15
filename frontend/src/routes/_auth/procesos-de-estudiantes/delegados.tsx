import { QueryKeys } from '@frontend/constants/queryKeys'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { Filters } from '@frontend/interfaces/types'
import { haveSomePermission } from '@frontend/lib/utils'
import DelegatesService from '@frontend/modules/student-process/services/delegates.service'
import DelegatesOverview from '@frontend/modules/student-process/views/Delegates'
import { useSessionStore } from '@frontend/store'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/procesos-de-estudiantes/delegados'
)({
  //validateSearch: () => ({}) as StudentsFilters,
  beforeLoad: async ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        StudentProcessPermissionsDict.MANAGE_DELEGATE,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as Filters,
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { session, getRoleWithPermission } = sessionStore
    const specialityId = getRoleWithPermission(
      StudentProcessPermissionsDict.MANAGE_DELEGATE
    )?.unitId?.toString()
    const idTerm = session?.term.id?.toString()
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.delegates.DELEGATES_LIST, {}],
      queryFn: () =>
        DelegatesService.fetchDelegates({}, specialityId ?? '', idTerm ?? ''),
    })
  },
  component: () => <DelegatesOverview />,
})
