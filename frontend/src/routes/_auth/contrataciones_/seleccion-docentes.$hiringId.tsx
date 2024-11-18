import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@frontend/components/anim/TransitionPage'
import HiringProcess from '@frontend/modules/hiring/views/TeacherSelection/HiringProcess'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/$hiringId'
)({
  validateSearch: () =>
    ({}) as {
      courseId: number
      courseName: string
    },
  component: () => <HiringProcessWrapper />,
})

function HiringProcessWrapper() {
  return (
    <TransitionPage>
      <HiringProcess />
    </TransitionPage>
  )
}
