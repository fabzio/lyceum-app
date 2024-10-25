import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Assigment } from '@/interfaces/models'
import { RoleAssigment } from '@/interfaces/models/RoleAssigment'
import groupBy from 'just-group-by'

interface Props {
  assigments: Assigment[]
}

export default function AssigmentAccordion({ assigments }: Props) {
  const rolesByAccount = groupBy(
    assigments,
    (assigment) => assigment.account.name
  )
  return (
    <Accordion type="single" collapsible>
      {Object.entries(rolesByAccount).map(([account, roles]) => (
        <AccordionItem key={account} value={account}>
          <AccordionTrigger>
            <div className="w-full px-2 flex justify-between">
              <h3>{account}</h3>
              <p>
                {roles.length} {roles.length === 1 ? 'rol' : 'roles'}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AssigmentAccordionItem
              roles={roles.map((role) => ({
                key: role.role.name,
                value: role.unit.name,
              }))}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function AssigmentAccordionItem({ roles }: { roles: RoleAssigment[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {roles.map((role) => (
        <li className="flex justify-between" key={role.key}>
          <div>
            <span className="font-">{role.key}</span> {role.value}
          </div>
          <div>
            <Button variant="destructive">Revocar</Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
