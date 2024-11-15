import TransitionPage from '@frontend/components/anim/TransitionPage'
import CoverLetterDetailSection from '@frontend/modules/student-process/views/CoverLetter/PresentationCardDetail/PresentationCardDetailSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/procesos-de-estudiantes/cartas-de-presentacion/$requestCode'
)({
  component: () => <CoverLetterDetailPage />,
})

function CoverLetterDetailPage() {
  return (
    <TransitionPage>
      <CoverLetterDetailSection />
    </TransitionPage>
  )
}
