import TransitionPage from '@frontend/components/anim/TransitionPage'
import AnwserSurveyDetail from '@frontend/modules/surveys/views/AnswerSurvey/AnwserSurveyDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/listado/responder')({
  validateSearch: () =>
    ({}) as {
      subjetAccountId: string
      scheduleId: number
      surveyId: number
    },
  component: () => <AnwserSurveyDetailPage />,
})

function AnwserSurveyDetailPage() {
  return (
    <TransitionPage>
      <AnwserSurveyDetail />
    </TransitionPage>
  )
}
