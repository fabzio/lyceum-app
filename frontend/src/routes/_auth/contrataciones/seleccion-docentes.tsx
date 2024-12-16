import { toastNotAutorized } from '@frontend/constants/errorMessages'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import TeacherSelection from '@frontend/modules/hiring/views/TeacherSelection'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes'
)({
  beforeLoad: async ({ context: { sessionStore, toaster } }) => {
    const { toast } = toaster
    const { getRoleWithPermission } = sessionStore
    if (
      !getRoleWithPermission(HiringPermissionsDict.VIEW_LIST_OF_OPEN_HIRINGS)
    ) {
      toast(toastNotAutorized)
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { session, getRoleWithPermission } = sessionStore
    return await queryClient.ensureQueryData({
      queryKey: [QueryKeys.hiring.HIRINGS, {}],
      queryFn: () =>
        HiringService.getHirings({
          unitId: getRoleWithPermission(
            HiringPermissionsDict.VIEW_LIST_OF_OPEN_HIRINGS
          )!.unitId,
          accountId: session?.id ?? '',
        }),
    })
  },
  component: () => <TeacherSelection />,
})
