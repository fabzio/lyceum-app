import TransitionPage from '@frontend/components/anim/TransitionPage'
import EnrollmentProposeRequest from '@frontend/modules/enrollment/views/EnrollmentPropose/EnrollmentProposeRequest'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/matricula/propuesta-horarios/$requestNumber'
)({
  component: () => <SceduleProposalRequestPage />,
})

function SceduleProposalRequestPage() {
  return (
    <TransitionPage>
      <EnrollmentProposeRequest />
    </TransitionPage>
  )
}
