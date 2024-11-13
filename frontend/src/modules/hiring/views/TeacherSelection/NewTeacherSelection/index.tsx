import PageLayout from '@frontend/layouts/PageLayout'
import TeacherSelectionForm from './components/TeacherSelectionForm'

export default function NewTeacherSelection() {
  return (
    <div>
      <PageLayout name="Nueva convocatoria docente">
        <TeacherSelectionForm />
      </PageLayout>
    </div>
  )
}
