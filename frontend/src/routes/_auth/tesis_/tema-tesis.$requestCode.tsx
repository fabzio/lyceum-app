import { QueryKeys } from '@/constants/queryKeys'
import ThesisNotFound from '@/modules/thesis/404'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'
import ThesisThemeDetailSection from '@/modules/thesis/views/ThesisTheme/ThesisThemeDetail/ThesisThemeDetailSection'
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
