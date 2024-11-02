import { QueryKeys } from '@frontend/constants/queryKeys'
import FAQService from '@frontend/modules/faq/services/faq.service'
import FAQs from '@frontend/modules/faq/views/FAQs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/preguntas-frecuentes/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.faq.FAQS],
      queryFn: () => FAQService.getFAQs(),
    })
  },
  component: () => <FAQs />,
})
