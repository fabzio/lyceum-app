import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

interface Props {
  assigments: Assigment[]
}
export default function AssigmentAccordion({ assigments }: Props) {
  return (
    <Accordion type="single" collapsible>
      {assigments.map((assigment, idx) => (
        <AccordionItem value={`item-${idx}`} key={assigment.user}>
          <AccordionTrigger>{assigment.user}</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              {assigment.roles.map((role) => (
                <AssigmentAccordionItem role={role} />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function AssigmentAccordionItem({ role }: { role: Role }) {
  return (
    <li className="flex justify-between">
      <div>
        {role.key} {role.value}
      </div>
      <div>
        <Button variant="destructive">Revocar</Button>
      </div>
    </li>
  )
}
