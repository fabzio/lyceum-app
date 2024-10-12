import { createFileRoute } from '@tanstack/react-router'
import ManageRoles from '@/modules/security/views/ManageRoles'
import { QueryKeys } from '@/constants/queryKeys'
import RolePermissionService from '@/modules/security/services/role-permission.service'

export const Route = createFileRoute('/seguridad/roles')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      queryFn: () => RolePermissionService.getRolePermissions(),
    })
  },
  component: () => <ManageRoles />,
})
