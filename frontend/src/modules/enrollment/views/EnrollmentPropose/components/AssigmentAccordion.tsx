import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import { Assigment } from '@frontend/interfaces/models'
import { RoleAssigment } from '@frontend/interfaces/models/RoleAssigment'
// import RevokeConfirmationDialog from './RevokeConfirmationDialog'

interface Props {
  assigments: Assigment[]
}

export default function AssigmentAccordion({ assigments = [] }: Props) {
  return (
    <Accordion type="single" collapsible>
      {assigments.length > 0 ? (
        assigments.map(({ id, name, roles }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger>
              <div className="w-full px-2 flex justify-between">
                <h3>{name}</h3>
                <p>
                  {roles.length} {roles.length === 1 ? 'rol' : 'roles'}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <AssigmentAccordionItem roles={roles} accountId={id} />
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <div className="text-center text-muted-foreground mt-2">
          No hay propuestas disponibles.
        </div>
      )}
    </Accordion>
  )
}

function AssigmentAccordionItem({
  roles,
  // accountId,
}: {
  roles: RoleAssigment[]
  accountId: string
}) {
  return (
    <ul className="flex flex-col gap-2">
      {roles.map((role) => (
        <li className="flex justify-between" key={role.id}>
          <div>
            <span className="font-">{role.name}</span> {role.unitName}
          </div>
          <div>
            {/* <RevokeConfirmationDialog
              accountId={accountId}
              roleId={role.id}
              unitId={role.unitId}
            /> */}
          </div>
        </li>
      ))}
    </ul>
  )
}
