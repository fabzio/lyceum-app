import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Permission } from '@/interfaces/Permission'
import groupBy from 'just-group-by'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormContext } from 'react-hook-form'

interface Props {
  onlyRead?: boolean
  permissions?: Permission[]
  index?: number
}

export default function PermissionAccordion({
  permissions = [],
  onlyRead = false,
  index,
}: Props) {
  const groupedPermissions = groupBy(
    permissions,
    (permission) => permission.moduleName
  )

  if (permissions.length === 0) {
    return (
      <div className="w-full h-32 font-semibold grid place-content-center">
        <p className="text-center text-opacity-70">
          No se encontraron permisos
        </p>
      </div>
    )
  }

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={onlyRead ? undefined : 'item-0'}
    >
      {Object.entries(groupedPermissions).map(([module, perms], idx) => (
        <AccordionItem value={`item-${idx}`} key={module}>
          <AccordionTrigger>{module}</AccordionTrigger>
          <AccordionContent>
            <PermissionItem
              permissions={perms}
              onlyRead={onlyRead}
              index={index}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

interface PermissionItemProps {
  permissions: Permission[]
  onlyRead: boolean
  index?: number
}

interface PermissionItemProps {
  permissions: Permission[]
  onlyRead: boolean
  index?: number
}

const PermissionItemReadOnly = ({
  permissions,
}: {
  permissions: Permission[]
}) => (
  <ul className="flex flex-col gap-2">
    {permissions.map((permission) => (
      <li
        className="flex justify-between items-center"
        key={permission.description}
      >
        <div className="flex gap-1 items-center">
          <label htmlFor={`permission-${permission.id}`}>
            {permission.description}
          </label>
        </div>
      </li>
    ))}
  </ul>
)

const PermissionItemEditable = ({
  permissions,
  index,
}: {
  permissions: Permission[]
  index?: number
}) => {
  const { getValues, setValue } = useFormContext()

  const selectedPermissions =
    index != undefined
      ? (getValues(`permissions.${index}.selected`) as number[])
      : []

  const togglePermission = (permissionId: number) => {
    const updatedPermissions = selectedPermissions.includes(permissionId)
      ? selectedPermissions.filter((id) => id !== permissionId)
      : [...selectedPermissions, permissionId]
    setValue(`permissions.${index}.selected`, updatedPermissions)
  }

  return (
    <ul className="flex flex-col gap-2">
      {permissions.map((permission) => (
        <li
          className="flex justify-between items-center"
          key={permission.description}
        >
          <div className="flex gap-1 items-center">
            <Checkbox
              id={`permission-${permission.id}`}
              checked={selectedPermissions.includes(permission.id) || false}
              onCheckedChange={() => togglePermission(permission.id)}
            />
            <label htmlFor={`permission-${permission.id}`}>
              {permission.description}
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}

const PermissionItem = ({
  permissions,
  onlyRead,
  index,
}: PermissionItemProps) => {
  return onlyRead ? (
    <PermissionItemReadOnly permissions={permissions} />
  ) : (
    <PermissionItemEditable permissions={permissions} index={index} />
  )
}
