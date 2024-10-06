import { QueryKeys } from '@/constants/queryKeys'
import { FAQ } from '@/faq/interfaces/FAQ'
import useQueryStore from '@/hooks/useQueryStore'
import NewCategoryDialog from './NewCategoryDialog'

export default function FAQCategoriesList() {
  const { data: faqs } = useQueryStore<FAQ[]>(QueryKeys.faq.FAQS)

  const categories = [...new Set(faqs.map((faq) => faq.category))]

  return (
    <div className="px-4">
      <NewCategoryDialog />
      {categories.map((category) => (
        <div key={category} className="p-4">
          <p>{category}</p>
        </div>
      ))}
    </div>
  )
}
