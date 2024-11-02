import PageLayout from '@frontend/layouts/PageLayout'
import StudentProcessManagement from './components/StudentProcessManagement'

export default function StudentProcess() {
  return (
    <PageLayout name="Procesos de Estudiantes">
      <StudentProcessManagement />
    </PageLayout>
  )
}
