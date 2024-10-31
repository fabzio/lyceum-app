import TransitionPage from '@/components/anim/TransitionPage'
import Enrollments from '@/modules/enrollment'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllowedModules } = sessionStore
    if (!getAllowedModules().includes('ENROLLMENT')) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <MatriculaPage />,
})

function MatriculaPage() {
  return (
    <TransitionPage>
      <Enrollments />
    </TransitionPage>
  )
}
