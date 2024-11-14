import { toastNotAutorized } from '@frontend/constants/errorMessages'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { SurveyPermissionsDict } from '@frontend/interfaces/enums/permissions/Survey'
import { Filters } from '@frontend/interfaces/types'
import SurveyManagementService from '@frontend/modules/surveys/services/ManageSurvey.service'
import ManageSurvey from '@frontend/modules/surveys/views/ManageSurvey'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/gestionar')({
  validateSearch: () => ({}) as Filters,
  beforeLoad: async ({ context: { sessionStore, toaster } }) => {
    const { havePermission } = sessionStore
    const { toast } = toaster
    if (!havePermission(SurveyPermissionsDict.CREATE_SURVEY)) {
      toast(toastNotAutorized)
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { getRoleWithPermission } = sessionStore
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.survey.SURVEYS],
      queryFn: () =>
        SurveyManagementService.getSurveysOfSpeciality({
          unitId: getRoleWithPermission(SurveyPermissionsDict.CREATE_SURVEY)!
            .unitId,
        }),
    })
  },
  component: () => <ManageSurvey />,
})
