import { createFileRoute } from '@tanstack/react-router'
import ThesisTheme from '@/modules/thesis/views/ThesisTheme'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'

export const Route = createFileRoute('/tesis/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
      queryFn: () => ThesisThemeRequestService.getThesisThemeRequest(),
    })
  },
  component: () => <ThesisTheme />,
})
