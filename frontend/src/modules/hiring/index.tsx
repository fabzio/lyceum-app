import PageLayout from '@frontend/layouts/PageLayout'
import { HiringModule } from './hiring.module'
import HiringManagement from './components/HiringManagement'

export default function Hiring() {
  return (
    <PageLayout name={HiringModule.label}>
      <HiringManagement />
    </PageLayout>
  )
}
