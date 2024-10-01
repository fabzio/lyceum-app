import { createFileRoute } from '@tanstack/react-router'
import ManageRoles from '@/security/views/ManageRoles'
import { QueryKeys } from '@/constants/queryKeys'
import RolePermissionService from '@/security/services/role-permission.service'

export const Route = createFileRoute('/seguridad/roles')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      queryFn: () => RolePermissionService.getRolePermissions(),
    })
  },
  component: () => <ManageRoles />,
})
