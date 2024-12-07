import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import { Badge } from '@frontend/components/ui/badge'
import {
  Permission,
  RolePermission,
  UnitType,
} from '@frontend/interfaces/models'
import { mapUnitType } from '@frontend/lib/mapUnitType'
import groupBy from 'just-group-by'
import RemoveConfirmationDialog from './RemoveConfirmationDialog'
import EditRoleModal from './EditRoleModal'
import { X } from 'lucide-react'
import { Button } from '@frontend/components/ui/button'
import RolePermissionService from '@frontend/modules/security/services/role-permission.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@frontend/hooks/use-toast'
import { QueryKeys } from '@frontend/constants/queryKeys'

interface Props {
  rolePermissions: RolePermission[]
  search?: string
}

export default function RolesAccordion({
  rolePermissions = [],
  search = '',
}: Props) {
  // Agrupar por nombre de rol y tipo de unidad combinados
  const permissionsGroupedByRole = groupBy(
    rolePermissions,
    (rolePermission) =>
      `${rolePermission.role.id}.${rolePermission.role.name}-${rolePermission.role.unitType}`
  )

  const filteredPermissions = Object.entries(permissionsGroupedByRole).filter(
    ([roleKey]) => {
      const [, roleName] = roleKey.split('.') as [string, string] // Extraer roleName del roleKey
      return roleName.toLowerCase().includes(search) // Coincidencia parcial con el término de búsqueda
    }
  )

  if (filteredPermissions.length === 0) {
    return (
      <div className="w-full h-32 font-semibold grid place-content-center">
        <p className="text-center text-opacity-70">No se encontraron roles</p>
      </div>
    )
  }

  return (
    <section>
      <Accordion type="single" collapsible>
        {filteredPermissions.map(([roleKey, rolePermissions], idx) => {
          const [role, unitType] = roleKey.split('-') as [string, UnitType]
          const [roleId, roleName] = role.split('.')
          return (
            <div key={idx} className="flex items-start">
              <AccordionItem
                className="flex-grow"
                value={`item-${idx}`}
                key={roleKey}
              >
                <AccordionTrigger>
                  <section className="flex justify-between w-full px-2">
                    <div className="flex flex-col items-start">
                      <span>{roleName}</span>
                      <span>
                        <Badge variant="secondary">
                          {mapUnitType[unitType]}
                        </Badge>
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
                  <div>
                    <RoleItem
                      permissions={rolePermissions.map((rp) => rp.permission)}
                      roleId={+roleId}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <EditRoleModal
                roleData={{
                  role: { id: +roleId, name: roleName, unitType: unitType },
                  permission: rolePermissions.map((rp) => rp.permission),
                }}
              />
              <RemoveConfirmationDialog roleId={+roleId} />
            </div>
          )
        })}
      </Accordion>
    </section>
  )
}

function RoleItem({
  permissions,
  roleId,
}: {
  permissions: Permission[]
  roleId: number
}) {
  const groupedPermissionsByModule = groupBy(
    permissions,
    (permission) => permission.moduleName
  )
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: ({ permissionId }: { permissionId: number }) =>
      RolePermissionService.deletePermissionFromRole(roleId, permissionId),
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      })
      toast({
        title: 'Permiso eliminado',
        description: 'El permiso ha sido eliminado con éxito',
      })
    },
  })

  const handleRemovePermission = (permissionId: number) => {
    if (permissions.length === 1) {
      toast({
        title: 'Operación no permitida',
        description: 'Un rol no puede quedar sin permisos',
        variant: 'destructive',
      })
      return
    }
    mutate({ permissionId })
  }

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
                    <Button
                      className="mt-2"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemovePermission(permission.id)}
                    >
                      <X />
                    </Button>
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
