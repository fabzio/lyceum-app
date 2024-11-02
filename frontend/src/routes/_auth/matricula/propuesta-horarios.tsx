import { QueryKeys } from '@frontend/constants/queryKeys'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { haveSomePermission } from '@frontend/lib/utils'
import { EnrollmentModule } from '@frontend/modules/enrollment/enrollment.module'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import EnrollmentPropose from '@frontend/modules/enrollment/views/EnrollmentPropose'
import { EnrollmentProposalFilters } from '@frontend/modules/enrollment/views/EnrollmentPropose/interfaces/EnrollmentProposalFilters'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/propuesta-horarios')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(
        getAllPermissions(),
        EnrollmentModule.submodules.find(
          (submodule) => submodule.path === '/matricula/propuesta-horarios'
        )!.permissions
      )
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as EnrollmentProposalFilters,
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { getRoleWithPermission } = sessionStore
    const unitId = getRoleWithPermission(
      EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL
    )!.unitId
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS],
      queryFn: () =>
        EnrollmentService.getEnrollmentProposals({
          facultyId: unitId,
          filters: {},
        }),
    })
  },
  component: () => <EnrollmentPropose />,
})
