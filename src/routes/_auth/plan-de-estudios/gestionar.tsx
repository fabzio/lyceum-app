import StudyPlanManagement from '@/modules/study-plans/views/StudyPlansManagement'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios/gestionar')({
  component: () => <StudyPlanManagement />,
})
