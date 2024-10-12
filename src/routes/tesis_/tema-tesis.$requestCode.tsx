import TransitionPage from '@/components/anim/TransitionPage'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'
import ThesisThemeDetail from '@/modules/thesis/views/ThesisTheme/ThesisThemeDetail'
import { createFileRoute } from '@tanstack/react-router'

type ThesisReviewSearch = {
  historyId: number
}
export const Route = createFileRoute('/tesis/tema-tesis/$requestCode')({
  validateSearch: (search: Record<string, unknown>): ThesisReviewSearch => ({
    historyId: parseInt(search?.historyId as string),
  }),
  loader: async ({ params: { requestCode }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
      queryFn: () =>
        ThesisThemeRequestService.getThemeRequestDetail(requestCode),
    })
  },
  component: () => (
    <TransitionPage>
      <ThesisThemeDetail />
    </TransitionPage>
  ),
})
