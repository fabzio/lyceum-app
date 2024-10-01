import { createFileRoute } from '@tanstack/react-router'
import Permissions from '@/security/views/Permissions'
import PermissionService from '@/security/services/permission.service'
import { QueryKeys } from '@/constants/queryKeys'

export const Route = createFileRoute('/seguridad/permisos')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.PERMISSIONS],
      queryFn: () => PermissionService.getPermissions(),
    })
  },
  component: () => <Permissions />,
})
