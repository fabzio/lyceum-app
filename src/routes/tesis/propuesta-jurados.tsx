import { QueryKeys } from '@/constants/queryKeys'
import ThesisJuryRequestService from '@/thesis/services/thesisJuryRequest.service'
import ThesisJuryRequestList from '@/thesis/views/ThesisJury'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/propuesta-jurados')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_JURY_REQUESTS],
      queryFn: () => ThesisJuryRequestService.getThesisJuryRequests(),
    })
  },
  component: () => <ThesisJuryRequestList />,
})
