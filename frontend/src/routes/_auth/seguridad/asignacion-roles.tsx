import { createFileRoute } from '@tanstack/react-router'
import AsignRoles from '@frontend/modules/security/views/AsignRoles'
import RoleAccountsService from '@frontend/modules/security/services/RoleAccounts.service'
import { QueryKeys } from '@frontend/constants/queryKeys'

export const Route = createFileRoute('/_auth/seguridad/asignacion-roles')({
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.ROLE_ACCOUNTS],
      queryFn: RoleAccountsService.getRoleAccounts,
    }),
  component: () => <AsignRoles />,
})
