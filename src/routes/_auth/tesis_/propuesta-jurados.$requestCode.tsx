import { QueryKeys } from '@/constants/queryKeys'
import ThesisNotFound from '@/modules/thesis/404'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'
import ThesisJuryDetailSection from '@/modules/thesis/views/ThesisJury/ThesisJuryDetail/ThesisJuryDetailSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/tesis/propuesta-jurados/$requestCode',
)({
  loader: async ({ params: { requestCode }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
      queryFn: () =>
        ThesisThemeRequestService.getThemeRequestDetail(requestCode),
    })
  },
  component: () => <ThesisJuryDetailSection />,
  notFoundComponent: () => <ThesisNotFound />,
})
