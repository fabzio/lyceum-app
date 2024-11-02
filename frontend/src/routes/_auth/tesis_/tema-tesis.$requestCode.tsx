import { QueryKeys } from '@frontend/constants/queryKeys'
import ThesisNotFound from '@frontend/modules/thesis/404'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import ThesisThemeDetailSection from '@frontend/modules/thesis/views/ThesisTheme/ThesisThemeDetail/ThesisThemeDetailSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/tema-tesis/$requestCode')({
  loader: ({ params: { requestCode }, context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
      queryFn: () =>
        ThesisThemeRequestService.getThemeRequestDetail(requestCode),
    }),
  component: () => <ThesisThemeDetailSection />,
  notFoundComponent: () => <ThesisNotFound />,
})
