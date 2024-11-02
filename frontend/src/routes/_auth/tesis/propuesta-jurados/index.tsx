import { QueryKeys } from '@frontend/constants/queryKeys'
import ErrorPage from '@frontend/layouts/ErrorPage'
import ThesisJuryRequestService from '@frontend/modules/thesis/services/thesisJuryRequest.service'
import ThesisJuryRequestList from '@frontend/modules/thesis/views/ThesisJury'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/propuesta-jurados/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_JURY_REQUESTS],
      queryFn: () => ThesisJuryRequestService.getThesisJuryRequests(),
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
