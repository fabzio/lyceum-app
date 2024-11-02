import TransitionPage from '@frontend/components/anim/TransitionPage'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { haveSomePermission } from '@frontend/lib/utils'
import EnrollmentProposeRequest from '@frontend/modules/enrollment/views/EnrollmentPropose/EnrollmentProposeRequest'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/matricula/propuesta-horarios/$requestNumber'
)({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
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
