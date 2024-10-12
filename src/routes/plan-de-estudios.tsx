import TransitionPage from '@/components/anim/TransitionPage'
import StudyPlans from '@/modules/study-plans'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plan-de-estudios')({
  component: () => <StudyPlansPage />,
})

function StudyPlansPage() {
  return (
    <TransitionPage>
      <StudyPlans />
    </TransitionPage>
  )
}
