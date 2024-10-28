import TransitionPage from '@/components/anim/TransitionPage'
import Home from '@/views/Home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  component: () => <HomePage />,
})

function HomePage() {
  return (
    <TransitionPage>
      <Home />
    </TransitionPage>
  )
}
