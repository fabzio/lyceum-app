import { createFileRoute } from '@tanstack/react-router'
import ManageRoles from '@frontend/modules/security/views/ManageRoles'
import { QueryKeys } from '@frontend/constants/queryKeys'
import RolePermissionService from '@frontend/modules/security/services/role-permission.service'

export const Route = createFileRoute('/_auth/seguridad/roles')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      queryFn: () => RolePermissionService.getRolePermissions(),
    })
  },
  component: () => <ManageRoles />,
})
