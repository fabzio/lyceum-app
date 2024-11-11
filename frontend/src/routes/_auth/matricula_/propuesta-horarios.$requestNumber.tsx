import TransitionPage from '@frontend/components/anim/TransitionPage'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { haveSomePermission } from '@frontend/lib/utils'
import EnrollmentProposeRequest from '@frontend/modules/enrollment/views/EnrollmentPropose/EnrollmentProposeRequest'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { CourseProposalFilters } from '@frontend/modules/enrollment/views/EnrollmentDistribution/interfaces/CourseProposalFilters'
import { QueryKeys } from '@frontend/constants/queryKeys'
import CourseProposalService from '@frontend/modules/enrollment/views/EnrollmentDistribution/services/CourseProposal.service'

export const Route = createFileRoute(
  '/_auth/matricula/propuesta-horarios/$requestNumber'
)({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL,
        EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as CourseProposalFilters,
  loader: async ({ context: { queryClient }, params: { requestNumber } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.COURSE_PROPOSALS, +requestNumber],
      queryFn: () =>
        CourseProposalService.fetchCourseProposals({
          requestNumber: +requestNumber,
        }),
    })
  },
  component: () => <SceduleProposalRequestPage />,
})

function SceduleProposalRequestPage() {
  return (
    <TransitionPage>
      <EnrollmentProposeRequest />
    </TransitionPage>
  )
}
