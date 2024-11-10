import { QueryKeys } from '@frontend/constants/queryKeys'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import ErrorPage from '@frontend/layouts/ErrorPage'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import ThesisTheme from '@frontend/modules/thesis/views/ThesisTheme'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/tema-tesis/')({
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { getRoleWithPermission, havePermission } = sessionStore

    const specialtiyId = getRoleWithPermission(
      ThesisPermissionsDict.APROVE_THESIS_PHASE_3
    )?.unitId
    const areaId = getRoleWithPermission(
      ThesisPermissionsDict.APROVE_THESIS_PHASE_2
    )?.unitId

    let accountCode = sessionStore.session!.code

    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
      queryFn: specialtiyId
        ? () =>
            ThesisThemeRequestService.getSpecialtyThesisThemeRequest({
              specialtiyId,
            })
        : areaId
          ? () =>
              ThesisThemeRequestService.getAreaThesisThemeRequest({
                areaId: areaId,
              })
          : havePermission(ThesisPermissionsDict.APROVE_THESIS_PHASE_1)
            ? () =>
                ThesisThemeRequestService.getAdvisorThesisThemeRequest({
                  advisorCode: accountCode,
                })
            : () =>
                ThesisThemeRequestService.getStudentThesisThemeRequest({
                  studentCode: accountCode,
                }),
    })
  },
  component: () => <ThesisTheme />,
  errorComponent: ({ error }) => (
    <ErrorPage
      description="Lo sentimos, no se pudo cargar las solicitudes de tesis"
      displayErrorMessage={error.message}
    />
  ),
})
