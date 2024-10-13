import StudyPlanDetail from '@/modules/study-plans/views/StudyPlansManagement/StudyPlanDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/plan-de-estudios/gestionar/$planId'
)({
  component: () => <StudyPlanDetail />,
})
