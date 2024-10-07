import { QueryKeys } from '@/constants/queryKeys'
import FAQService from '@/faq/services/faq.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import groupBy from 'just-group-by'
import CategorizedFAQList from './CategorizedFAQList'
import FAQCategoriesList from './ManageCategories/FAQCategoriesList'
import NewFAQDialog from './NewFAQDialog'
import { Separator } from '@/components/ui/separator'

export default function FAQs() {
  const { data: faqsList } = useSuspenseQuery({
    queryKey: [QueryKeys.faq.FAQS],
    queryFn: () => FAQService.getFAQs(),
  })
  const groupedFAQs = groupBy(faqsList, (faq) => faq.category)
  return (
    <div className="flex gap-2 px-5 ">
      <section>
        <FAQCategoriesList />
      </section>
      <Separator orientation="vertical" className="h-[700px]" />
      <section className="flex-1">
        <div className="w-full flex justify-end">
          <NewFAQDialog />
        </div>
        <div>
          {faqsList.length ? (
            <CategorizedFAQList categorizedFAQs={groupedFAQs} />
          ) : (
            <div className="w-full h-60 flex justify-center items-center">
              No se encontraron preguntas frecuentes
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
