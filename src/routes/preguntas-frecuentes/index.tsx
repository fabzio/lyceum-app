import { QueryKeys } from '@/constants/queryKeys'
import FAQService from '@/faq/services/faq.service'
import FAQs from '@/faq/views/FAQs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preguntas-frecuentes/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.faq.FAQS,1],
      queryFn: () => FAQService.getFAQs(),
    })
  },
  component: () => <FAQs />,
})
