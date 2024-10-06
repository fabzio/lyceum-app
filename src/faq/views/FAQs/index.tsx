import { QueryKeys } from '@/constants/queryKeys'
import FAQService from '@/faq/services/faq.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import groupBy from 'just-group-by'
import CategorizedFAQList from './ManageCategories/CategorizedFAQList'
import FAQCategoriesList from './ManageCategories/FAQCategoriesList'
import NewFAQDialog from './NewFAQDialog'

export default function FAQs() {
  const { data: faqsList } = useSuspenseQuery({
    queryKey: [QueryKeys.faq.FAQS],
    queryFn: () => FAQService.getFAQs(),
  })
  const groupedFAQs = groupBy(faqsList, (faq) => faq.category)
  return (
    <div className="flex gap-2">
      <section>
        <FAQCategoriesList />
      </section>
      <section className="flex-1">
        <div className="w-full flex justify-end">
          <NewFAQDialog />
        </div>
        <div>
          <CategorizedFAQList categorizedFAQs={groupedFAQs} />
        </div>
      </section>
    </div>
  )
}
