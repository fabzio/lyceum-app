import TransitionPage from '@/components/anim/TransitionPage'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <TransitionPage key={location.pathname}>
      <h3>Bienvenido a Lyceum!</h3>
    </TransitionPage>
  )
}
