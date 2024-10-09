import { createFileRoute } from '@tanstack/react-router'
import ThesisTheme from '@/thesis/views/ThesisTheme'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisThemeRequestService from '@/thesis/services/ThesisThemeRequest.service'

export const Route = createFileRoute('/tesis/')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
      queryFn: () => ThesisThemeRequestService.getThesisThemeRequest(),
    })
  },
  component: () => <ThesisTheme />,
})
