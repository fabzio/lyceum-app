import { QueryKeys } from '@/constants/queryKeys'
import FAQService from '@/faq/services/ask.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import groupBy from 'just-group-by'
import CategorizedFAQList from './CategorizedFAQList'
import FAQCategoriesList from './FAQCategoriesList'

export default function FAQs() {
  const { data: faqsList } = useSuspenseQuery({
    queryKey: [QueryKeys.faq.FAQS],
    queryFn: () => FAQService.getFAQs(),
  })
  const groupedFAQs = groupBy(faqsList, (faq) => faq.category)
  return (
    <div className='flex gap-2'>
      <section>
        <FAQCategoriesList />
      </section>
      <section className='flex-1'>
        <CategorizedFAQList categorizedFAQs={groupedFAQs} />
      </section>
    </div>
  )
}
