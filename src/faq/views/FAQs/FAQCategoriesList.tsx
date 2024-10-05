import { QueryKeys } from '@/constants/queryKeys'
import { FAQ } from '@/faq/interfaces/asks'
import useQueryStore from '@/hooks/useQueryStore'

export default function FAQCategoriesList() {
  const { data: faqs } = useQueryStore<FAQ[]>(QueryKeys.faq.FAQS)

  const categories = [...new Set(faqs.map((faq) => faq.category))]
  
  return (
    <div className="px-4">
      {categories.map((category) => (
        <div key={category} className="p-4">
          <p>{category}</p>
        </div>
      ))}
    </div>
  )
}
