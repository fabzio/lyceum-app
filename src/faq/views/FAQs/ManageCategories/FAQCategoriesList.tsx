import FAQCategoryService from '@/faq/services/faqCategory.service'
import NewCategoryDialog from './NewCategoryDialog'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/queryKeys'

export default function FAQCategoriesList() {
  const { data: categories } = useSuspenseQuery({
    queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
    queryFn: FAQCategoryService.getFAQCategories,
  })
  if (!categories) return <p>No hay categorías de preguntas frecuentes</p>
  return (
    <div className="px-4">
      <NewCategoryDialog />
      {categories.map((category, idx) => (
        <div key={idx} className="p-4">
          <a href={`#${category.name}`}>{category.name}</a>
        </div>
      ))}
    </div>
  )
}
