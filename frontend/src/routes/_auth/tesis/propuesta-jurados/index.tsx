import { QueryKeys } from '@frontend/constants/queryKeys'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import ErrorPage from '@frontend/layouts/ErrorPage'
import ThesisJuryRequestService from '@frontend/modules/thesis/services/thesisJuryRequest.service'
import ThesisJuryRequestList from '@frontend/modules/thesis/views/ThesisJury'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/propuesta-jurados/')({
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { getRoleWithPermission } = sessionStore
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_JURY_REQUESTS],
      queryFn: () =>
        ThesisJuryRequestService.getThesisJuryRequests(
          getRoleWithPermission(ThesisPermissionsDict.READ_THESIS_JURY)?.unitId!
        ),
    })
  },
  component: () => <ThesisJuryRequestList />,
  errorComponent: ({ error }) => (
    <ErrorPage
      description="Lo sentimos, no se pudo cargar las solicitudes de jurados"
      displayErrorMessage={error.message}
    />
  ),
})
