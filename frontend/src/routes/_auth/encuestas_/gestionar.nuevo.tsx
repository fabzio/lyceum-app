import TransitionPage from '@frontend/components/anim/TransitionPage'
import NewSurvey from '@frontend/modules/surveys/views/ManageSurvey/NewSurvey'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/gestionar/nuevo')({
  component: () => <NewSurveyPage />,
})

function NewSurveyPage() {
  return (
    <TransitionPage>
      <NewSurvey />
    </TransitionPage>
  )
}
