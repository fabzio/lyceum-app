import { QueryKeys } from '@/constants/queryKeys'
import FAQService from '@/modules/faq/services/faq.service'
import FAQs from '@/modules/faq/views/FAQs'
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
