import { QueryKeys } from '@frontend/constants/queryKeys'
import ErrorPage from '@frontend/layouts/ErrorPage'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import ThesisTheme from '@frontend/modules/thesis/views/ThesisTheme'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/tema-tesis/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
      queryFn: () => ThesisThemeRequestService.getThesisThemeRequest(),
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
