import TransitionPage from '@frontend/components/anim/TransitionPage'
import { QueryKeys } from '@frontend/constants/queryKeys'
import ThesisNotFound from '@frontend/modules/thesis/404'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import ThesisJuryDetailSection from '@frontend/modules/thesis/views/ThesisJury/ThesisJuryDetail/ThesisJuryDetailSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/tesis/propuesta-jurados/$requestCode'
)({
  loader: async ({ params: { requestCode }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
      queryFn: () =>
        ThesisThemeRequestService.getThemeRequestDetail(requestCode),
    })
  },
  component: () => (
    <TransitionPage>
      <ThesisJuryDetailSection />
    </TransitionPage>
  ),
  notFoundComponent: () => <ThesisNotFound />,
})
