import PageLayout from '@/layouts/PageLayout'
import StudyPlansManagment from './components/StudyPlansManagment'
import { StudyPlanModule } from './study-plan.module'

export default function StudyPlans() {
  return (
    <PageLayout name={StudyPlanModule.label}>
      <StudyPlansManagment />
    </PageLayout>
  )
}
