import { Input } from '@/components/ui/input'
import SelectFilter from './SelectFilter'
import RolesAccordion from './RolesAccordion'
import NewRole from './NewRole'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/queryKeys'
import RolePermissionService from '@/modules/security/services/role-permission.service'

export default function ManageRoles() {
  const { data: rolePermissions } = useSuspenseQuery({
    queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
    queryFn: () => RolePermissionService.getRolePermissions(),
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row  justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar rol" />
        </div>
        <div className="flex gap-2">
          <SelectFilter />
          <NewRole />
        </div>
      </div>
      <div>
        <RolesAccordion rolePermissions={rolePermissions} />
      </div>
    </div>
  )
}
