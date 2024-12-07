import { Input } from '@frontend/components/ui/input'
//import SelectFilter from './components/SelectFilter'
import RolesAccordion from './components/RolesAccordion'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import RolePermissionService from '@frontend/modules/security/services/role-permission.service'
import { Link } from '@tanstack/react-router'
import { Button } from '@frontend/components/ui/button'
import { useState } from 'react'

export default function ManageRoles() {
  const { data: rolePermissions } = useSuspenseQuery({
    queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
    queryFn: () => RolePermissionService.getRolePermissions(),
  })

  const [search, setSearch] = useState('')
  //<SelectFilter />
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row  justify-between gap-2">
        <div className="md:flex-grow">
          <Input
            type="search"
            placeholder="🔎 Buscar rol"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="flex gap-2">
          <Link to="/seguridad/roles/nuevo">
            <Button>Nuevo Rol</Button>
          </Link>
        </div>
      </div>
      <div>
        <RolesAccordion rolePermissions={rolePermissions} search={search} />
      </div>
    </div>
  )
}
