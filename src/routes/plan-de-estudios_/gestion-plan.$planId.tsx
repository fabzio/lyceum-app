import StudyPlanEdit from '@/modules/study-plans/components/StudyPlanEdit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plan-de-estudios/gestion-plan/$planId')({
  component: () => <StudyPlanEdit />,
})
