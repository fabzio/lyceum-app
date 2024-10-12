import TransitionPage from '@/components/anim/TransitionPage'
import ThesisJuryDetail from '@/modules/thesis/views/ThesisJury/ThesisJuryDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/propuesta-jurados')({
  component: () => (
    <TransitionPage>
      <ThesisJuryDetail />
    </TransitionPage>
  ),
})
