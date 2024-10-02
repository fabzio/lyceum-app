import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { FAQ } from '../interfaces/asks'

interface Props {
  faqs: FAQ[]
}
export default function AskAccordion({ faqs = [] }: Props) {
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
        <h3>{faq.question}</h3>
      </AccordionTrigger>
      <AccordionContent>
        <p>{faq.answer}</p>
      </AccordionContent>
    </AccordionItem>
  )
}
