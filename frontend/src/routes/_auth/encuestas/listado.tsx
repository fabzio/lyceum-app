import { toastNotAutorized } from '@frontend/constants/errorMessages'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { SurveyPermissionsDict } from '@frontend/interfaces/enums/permissions/Survey'
import AnwserSurveyService from '@frontend/modules/surveys/services/AnswerSurvey.service'
import AnwserSurvey from '@frontend/modules/surveys/views/AnwserSurvey'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/listado')({
  beforeLoad: async ({ context: { sessionStore, toaster } }) => {
    const { havePermission } = sessionStore
    const { toast } = toaster
    if (!havePermission(SurveyPermissionsDict.ANSWER_SURVEY)) {
      toast(toastNotAutorized)
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { session } = sessionStore
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.survey.UNANWSERED_SURVEYS],
      queryFn: () =>
        AnwserSurveyService.getUnawseredSurveys({
          accountId: session!.id,
        }),
    })
  },
  component: () => <AnwserSurvey />,
})
