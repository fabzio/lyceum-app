import TransitionPage from '@/components/anim/TransitionPage'
import Enrollments from '@/modules/enrollment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matricula')({
  component: () => <MatriculaPage />,
})
function MatriculaPage() {
  return (
    <TransitionPage>
      <Enrollments />
    </TransitionPage>
  )
}
