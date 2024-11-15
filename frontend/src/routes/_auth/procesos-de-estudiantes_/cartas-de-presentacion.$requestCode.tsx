import TransitionPage from '@frontend/components/anim/TransitionPage'
import CoverLetterDetail from '@frontend/modules/student-process/views/CoverLetter/PresentationCardDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/procesos-de-estudiantes/cartas-de-presentacion/$requestCode'
)({
  component: () => <CoverLetterDetailPage />,
})

function CoverLetterDetailPage() {
  return (
    <TransitionPage>
      <CoverLetterDetail />
    </TransitionPage>
  )
}
