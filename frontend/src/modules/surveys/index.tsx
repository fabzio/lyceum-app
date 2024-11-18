import PageLayout from '@frontend/layouts/PageLayout'
import SurveysManagement from './components/SurveysManagement'
import { SurveysModule } from './surveys.module'

export default function Survey() {
  return (
    <PageLayout name={SurveysModule.label}>
      <SurveysManagement />
    </PageLayout>
  )
}
