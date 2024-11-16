import TransitionPage from '@frontend/components/anim/TransitionPage'
import { QueryKeys } from '@frontend/constants/queryKeys'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import CoverLetterDetailSection from '@frontend/modules/student-process/views/CoverLetter/PresentationCardDetail/PresentationCardDetailSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/procesos-de-estudiantes/cartas-de-presentacion/$requestCode'
)({
  loader: async ({ context: { queryClient }, params: { requestCode } }) => {
    return queryClient.ensureQueryData({
      queryKey: [
        QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS,
        requestCode,
      ],
      queryFn: () =>
        PresentationCardService.getPresentationCardDetail(+requestCode),
    })
  },
  component: () => <CoverLetterDetailPage />,
})

function CoverLetterDetailPage() {
  return (
    <TransitionPage>
      <CoverLetterDetailSection />
    </TransitionPage>
  )
}
