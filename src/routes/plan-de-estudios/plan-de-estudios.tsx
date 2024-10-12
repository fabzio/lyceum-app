import { createFileRoute } from '@tanstack/react-router'
import StudyPlanManagment from '@/study-plans/views/StudyPlanManagment'

export const Route = createFileRoute('/plan-de-estudios/plan-de-estudios')({
  component: () => <StudyPlanManagment/>
})


