import FAQAcordion from '@/faq/components/FAQAccordion'
import { FAQ } from '@/faq/interfaces/FAQ'

interface Props {
  categorizedFAQs: Record<string, FAQ[]>
}
export default function CategorizedFAQList({ categorizedFAQs }: Props) {
  return (
    <div className="flex flex-col gap-8 px-4">
      {Object.entries(categorizedFAQs).map(([category, faqs]) => {
        return (
          <section key={category}>
            <h3 className="text-4xl font-semibold">{category}</h3>
            <FAQAcordion faqs={faqs} />
          </section>
        )
      })}
    </div>
  )
}
