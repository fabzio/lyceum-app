import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@frontend/components/anim/TransitionPage'
import ApplicationView from '@frontend/modules/hiring/views/TeacherSelection/ApplicationForm/view'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/revision'
)({
  validateSearch: () =>
    ({}) as {
      courseId: number
      courseName: string
      jobRequestId: number
      hiringId: string
      hiringProcessId: string
    },
  component: () => <HiringProcessWrapper />,
})

function HiringProcessWrapper() {
  return (
    <TransitionPage>
      <ApplicationView />
    </TransitionPage>
  )
}
