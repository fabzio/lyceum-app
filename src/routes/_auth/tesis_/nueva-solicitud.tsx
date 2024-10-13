import TransitionPage from '@/components/anim/TransitionPage'
import NewThesisRequest from '@/modules/thesis/views/ThesisTheme/NewThesisRequest'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/nueva-solicitud')({
  component: () => <NewRequest />,
})
function NewRequest() {
  return (
    <TransitionPage>
      <NewThesisRequest />
    </TransitionPage>
  )
}
