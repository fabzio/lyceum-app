import { createFileRoute } from '@tanstack/react-router'
import StudyPlanManagment from '@/modules/study-plans/views/StudyPlanManagment'

export const Route = createFileRoute(
  '/_auth/plan-de-estudios/plan-de-estudios',
)({
  component: () => <StudyPlanManagment />,
})
