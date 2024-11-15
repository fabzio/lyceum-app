import TransitionPage from '@frontend/components/anim/TransitionPage'
import { QueryKeys } from '@frontend/constants/queryKeys'
import PresentationCardService from '@frontend/modules/presentationCard/services/presentationCard.service'
import PresentationCardDetailSection from '@frontend/modules/presentationCard/views/PresentationCardDetail/PresentationCardDetailSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/carta-de-presentacion/carta/$requestCode'
)({
  loader: ({ params: { requestCode }, context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode], //no tiene permisos para cartas de presentacion
      queryFn: () =>
        PresentationCardService.getPresentationCardRequests({
          accountCode: requestCode,
        }),
    }),
  component: () => (
    <TransitionPage>
      <PresentationCardDetailSection />
    </TransitionPage>
  ),
})
