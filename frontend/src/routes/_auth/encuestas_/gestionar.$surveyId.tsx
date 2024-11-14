import TransitionPage from '@frontend/components/anim/TransitionPage'
import { QueryKeys } from '@frontend/constants/queryKeys'
import SurveyManagementService from '@frontend/modules/surveys/services/ManageSurvey.service'
import ManageSurveyDetail from '@frontend/modules/surveys/views/ManageSurvey/ManageSurveyDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/gestionar/$surveyId')({
  loader: async ({ context: { queryClient }, params: { surveyId } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.survey.SURVEYS, surveyId],
      queryFn: () => SurveyManagementService.getSurveyResults(surveyId),
    })
  },
  component: () => <ManageSurveyDetailPage />,
})

function ManageSurveyDetailPage() {
  return (
    <TransitionPage>
      <ManageSurveyDetail />
    </TransitionPage>
  )
}
