import TransitionPage from '@frontend/components/anim/TransitionPage'
import Survey from '@frontend/modules/surveys'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas')({
  component: () => <SurveyPage />,
})

function SurveyPage() {
  return (
    <TransitionPage>
      <Survey />
    </TransitionPage>
  )
}
