import TransitionPage from '@/components/anim/TransitionPage'
import NewThesisRequest from '@/thesis/views/ThesisTheme/NewThesisRequest'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/nueva-solicitud')({
  component: () => <NewRequest />,
})
function NewRequest() {
  return (
    <TransitionPage>
      <NewThesisRequest />
    </TransitionPage>
  )
}
