import TransitionPage from '@/components/anim/TransitionPage'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisThemeRequestService from '@/thesis/services/ThesisThemeRequest.service'
import ThesisJuryDetail from '@/thesis/views/ThesisJury/ThesisJuryDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/propuesta-jurados/$requestCode')({
  loader: async ({ params: { requestCode }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
      queryFn: () =>
        ThesisThemeRequestService.getThemeRequestDetail(requestCode),
    })
  },
  component: () => <TransitionPage>
    <ThesisJuryDetail />
  </TransitionPage>
})
