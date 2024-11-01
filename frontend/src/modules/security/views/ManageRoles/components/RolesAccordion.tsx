import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Permission, RolePermission } from '@/interfaces/models'
import { mapUnitType } from '@/lib/mapUnitType'

import groupBy from 'just-group-by'

interface Props {
  rolePermissions: RolePermission[]
}

export default function RolesAccordion({ rolePermissions = [] }: Props) {
  // Agrupar por nombre de rol y tipo de unidad combinados
  const permissionsGroupedByRole = groupBy(
    rolePermissions,
    (rolePermission) =>
      `${rolePermission.role.name}-${rolePermission.role.unitType}`
  )

  if (rolePermissions.length === 0) {
    return (
      <div className="w-full h-32 font-semibold grid place-content-center">
        <p className="text-center text-opacity-70">No se encontraron roles</p>
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible>
      {Object.entries(permissionsGroupedByRole).map(
        ([roleKey, rolePermissions], idx) => {
          // Extraemos nombre del rol y tipo de unidad desde la clave
          const [roleName, unitType] = roleKey.split('-')

          return (
            <AccordionItem value={`item-${idx}`} key={roleKey}>
              <AccordionTrigger>
                <section className="flex justify-between w-full px-2">
                  <div className="flex flex-col items-start">
                    <span>{roleName}</span>
                    <span>
                      <Badge variant="secondary">{mapUnitType[unitType]}</Badge>
                    </span>
                  </div>
                  <div>
                    <span className="font-normal no-underline">{`${rolePermissions.length} permiso${
                      rolePermissions.length > 1 ? 's' : ''
                    }`}</span>
                  </div>
                </section>
              </AccordionTrigger>
              <AccordionContent>
                <RoleItem
                  permissions={rolePermissions.map((rp) => rp.permission)}
                />
              </AccordionContent>
            </AccordionItem>
          )
        }
      )}
    </Accordion>
  )
}

function RoleItem({ permissions }: { permissions: Permission[] }) {
  const groupedPermissionsByModule = groupBy(
    permissions,
    (permission) => permission.moduleName
  )

  return (
    <div>
      <ul className="list-disc">
        {Object.entries(groupedPermissionsByModule).map(
          ([module, perms], idx) => (
            <li key={idx}>
              <h3 className="font-bold">{module}</h3>
              <ul className="list-disc ml-4">
                {perms.map((permission) => (
                  <li key={permission.description}>
                    <span>{permission.description}</span>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  )
}
