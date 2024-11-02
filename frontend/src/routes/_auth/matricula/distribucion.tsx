import { QueryKeys } from '@frontend/constants/queryKeys'
import { haveSomePermission } from '@frontend/lib/utils'
import { EnrollmentModule } from '@frontend/modules/enrollment/enrollment.module'
import EnrollmentDistribution from '@frontend/modules/enrollment/views/EnrollmentDistribution'
import { CourseProposalFilters } from '@frontend/modules/enrollment/views/EnrollmentDistribution/interfaces/CourseProposalFilters'
import CourseProposalService from '@frontend/modules/enrollment/views/EnrollmentDistribution/services/CourseProposal.service'
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
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.COURSE_PROPOSALS, {}],
      queryFn: () => CourseProposalService.fetchCourseProposals({}),
    })
  },
  component: () => <EnrollmentDistribution />,
})
