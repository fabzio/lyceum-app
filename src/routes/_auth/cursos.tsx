import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@/components/anim/TransitionPage'
import Courses from '@/modules/courses'

export const Route = createFileRoute('/_auth/cursos')({
  component: () => <CursosPage />,
})
function CursosPage() {
  return (
    <TransitionPage>
      <Courses />
    </TransitionPage>
  )
}
