import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@frontend/components/anim/TransitionPage'
import ApplicationForm from '@frontend/modules/hiring/views/TeacherSelection/ApplicationForm/index'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/postulacion'
)({
  validateSearch: () =>
    ({}) as {
      courseId: number
      courseName: string
      hiringId: string
      hiringProcessId: string
    },
  component: () => <HiringProcessWrapper />,
})

function HiringProcessWrapper() {
  return (
    <TransitionPage>
      <ApplicationForm />
    </TransitionPage>
  )
}
