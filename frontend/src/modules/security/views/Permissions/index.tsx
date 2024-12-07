//import { Input } from '@frontend/components/ui/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import PermissionService from '@frontend/modules/security/services/permission.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import PermissionAccordion from '@frontend/modules/security/components/AcoordionPermissions'

export default function Permissions() {
  const { data: permissions } = useSuspenseQuery({
    queryKey: [QueryKeys.security.PERMISSIONS],
    queryFn: () => PermissionService.getPermissions(),
  })
  /*
    <div className="w-full flex-col">
        <div>
          <Input type="search" placeholder="🔎 Buscar permiso" />
        </div>
      </div>
  */
  return (
    <div className="flex flex-col my-6 p-2">
      <div>
        <PermissionAccordion permissions={permissions} onlyRead />
      </div>
    </div>
  )
}
