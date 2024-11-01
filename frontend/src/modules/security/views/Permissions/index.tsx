import { Input } from '@/components/ui/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import PermissionService from '@/modules/security/services/permission.service'
import { QueryKeys } from '@/constants/queryKeys'
import PermissionAccordion from '@/modules/security/components/AcoordionPermissions'

export default function Permissions() {
  const { data: permissions } = useSuspenseQuery({
    queryKey: [QueryKeys.security.PERMISSIONS],
    queryFn: () => PermissionService.getPermissions(),
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex-col">
        <div>
          <Input type="search" placeholder="🔎 Buscar permiso" />
        </div>
      </div>
      <div>
        <PermissionAccordion permissions={permissions} onlyRead />
      </div>
    </div>
  )
}
