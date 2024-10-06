import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { FAQ } from '../interfaces/FAQ'

interface Props {
  faqs: FAQ[]
}
export default function FAQAcordion({ faqs = [] }: Props) {
  if (!faqs.length)
    return (
      <div className="w-full flex justify-center items-center">
        No se encontraron preguntas frecuentes
      </div>
    )
  return (
    <Accordion type="single" collapsible>
      {faqs.map((faq, idx) => (
        <AskAccordionItem faq={faq} key={faq.id} value={`item-${idx}`} />
      ))}
    </Accordion>
  )
}

function AskAccordionItem({ faq, value }: { faq: FAQ; value: string }) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>
        <h3 className="font-semibold">{faq.question}</h3>
      </AccordionTrigger>
      <AccordionContent>
        <p>{faq.answer}</p>
      </AccordionContent>
    </AccordionItem>
  )
}
