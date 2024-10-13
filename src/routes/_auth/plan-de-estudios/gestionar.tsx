import { createFileRoute } from '@tanstack/react-router'
import StudyPlanManagment from '@/modules/study-plans/views/components/StudyPlanManagment'

export const Route = createFileRoute('/_auth/plan-de-estudios/gestionar')({
  component: () => <StudyPlanManagment />,
})
