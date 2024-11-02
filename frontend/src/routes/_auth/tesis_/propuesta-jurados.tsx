import TransitionPage from '@frontend/components/anim/TransitionPage'
import ThesisJuryDetail from '@frontend/modules/thesis/views/ThesisJury/ThesisJuryDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/propuesta-jurados')({
  component: () => (
    <TransitionPage>
      <ThesisJuryDetail />
    </TransitionPage>
  ),
})
