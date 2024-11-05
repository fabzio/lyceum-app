import FAQCategoryService from '@frontend/modules/faq/services/faqCategory.service'
import NewCategoryDialog from './NewCategoryDialog'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useQuery } from '@tanstack/react-query'
import Need from '@frontend/components/Need'
import { FAQPermissionsDict } from '@frontend/interfaces/enums/permissions/FAQ'

export default function FAQCategoriesList() {
  const { data: categories } = useQuery({
    queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
    queryFn: FAQCategoryService.getFAQCategories,
  })
  if (!categories) return <p>No hay categorías de preguntas frecuentes</p>
  return (
    <div className="px-4">
      <Need permissions={FAQPermissionsDict.MAGANE_FAQ}>
        <NewCategoryDialog />
      </Need>
      {categories.length ? (
        categories.map((category, idx) => (
          <div key={idx} className="p-4">
            <a href={`#${category.name}`}>{category.name}</a>
          </div>
        ))
      ) : (
        <p className="max-w-40 text-center my-6">
          No hay categorías de preguntas frecuentes
        </p>
      )}
    </div>
  )
}
