import { createFileRoute } from '@tanstack/react-router'
import Permissions from '@frontend/modules/security/views/Permissions'
import PermissionService from '@frontend/modules/security/services/permission.service'
import { QueryKeys } from '@frontend/constants/queryKeys'

export const Route = createFileRoute('/_auth/seguridad/permisos')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.PERMISSIONS],
      queryFn: () => PermissionService.getPermissions(),
    })
  },
  component: () => <Permissions />,
})
