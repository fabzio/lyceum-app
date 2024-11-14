import TransitionPage from '@frontend/components/anim/TransitionPage'
import { toastNotAutorized } from '@frontend/constants/errorMessages'
import StudyPlans from '@frontend/modules/study-plans'
import { StudyPlanModule } from '@frontend/modules/study-plans/study-plan.module'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios')({
  beforeLoad: ({ context: { sessionStore, toaster } }) => {
    const { getAllowedModules } = sessionStore
    const { toast } = toaster
    if (!getAllowedModules().includes(StudyPlanModule.code)) {
      toast(toastNotAutorized)
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
