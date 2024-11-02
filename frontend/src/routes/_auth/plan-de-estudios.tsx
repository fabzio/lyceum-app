import TransitionPage from '@frontend/components/anim/TransitionPage'
import StudyPlans from '@frontend/modules/study-plans'
import { StudyPlanModule } from '@frontend/modules/study-plans/study-plan.module'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllowedModules } = sessionStore
    if (!getAllowedModules().includes(StudyPlanModule.code)) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <StudyPlansPage />,
})

function StudyPlansPage() {
  return (
    <TransitionPage>
      <StudyPlans />
    </TransitionPage>
  )
}
