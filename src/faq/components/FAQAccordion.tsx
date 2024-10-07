import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { FAQ } from '../interfaces/FAQ'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EditFAQDialog from '../views/FAQs/EditFAQDialog'

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
    <div className="flex ">
      <AccordionItem className="flex-1" value={value}>
        <AccordionTrigger>
          <h3 className="font-semibold">{faq.question}</h3>
        </AccordionTrigger>
        <AccordionContent>
          <p>{faq.answer}</p>
        </AccordionContent>
      </AccordionItem>

      <div className="flex gap-2">
        <EditFAQDialog faq={faq} />
        <Button size="icon" variant="ghost">
          <Trash />
        </Button>
      </div>
    </div>
  )
}
