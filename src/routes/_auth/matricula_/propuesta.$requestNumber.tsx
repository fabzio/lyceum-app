import TransitionPage from '@/components/anim/TransitionPage'
import EnrollmentProposeRequest from '@/modules/enrollment/views/EnrollmentPropose/EnrollmentProposeRequest'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/matricula/propuesta/$requestNumber',
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
