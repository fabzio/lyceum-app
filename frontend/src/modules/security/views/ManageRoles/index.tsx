import { Input } from '@frontend/components/ui/input'
import SelectFilter from './components/SelectFilter'
import RolesAccordion from './components/RolesAccordion'
import NewRole from './components/NewRole'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import RolePermissionService from '@frontend/modules/security/services/role-permission.service'

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
