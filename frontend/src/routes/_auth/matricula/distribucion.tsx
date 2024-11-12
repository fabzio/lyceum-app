import { QueryKeys } from '@frontend/constants/queryKeys'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { haveSomePermission } from '@frontend/lib/utils'
import { EnrollmentModule } from '@frontend/modules/enrollment/enrollment.module'
import EnrollmenDistributionService from '@frontend/modules/enrollment/services/EnrollmentDistribution.service'
import EnrollmentDistribution from '@frontend/modules/enrollment/views/EnrollmentDistribution'
import { CourseProposalFilters } from '@frontend/modules/enrollment/views/EnrollmentDistribution/interfaces/CourseProposalFilters'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/distribucion')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(
        getAllPermissions(),
        EnrollmentModule.submodules.find(
          (submodule) => submodule.path === '/matricula/distribucion'
        )!.permissions
      )
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as CourseProposalFilters,
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { getRoleWithPermission } = sessionStore
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.SCHEDULE_DISTRIBUTION],
      queryFn: () =>
        EnrollmenDistributionService.getCoursesSchedules({
          unitId: getRoleWithPermission(
            EnrollmentPermissionsDict.READ_SCHEDULE_PROFESORS
          )!.unitId,
        }),
    })
  },
  component: () => <EnrollmentDistribution />,
})
