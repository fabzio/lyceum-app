import { createFileRoute } from '@tanstack/react-router'
import AsignRoles from '@/modules/security/views/AsignRoles'
import RoleAccountsService from '@/modules/security/services/RoleAccounts.service'
import { QueryKeys } from '@/constants/queryKeys'

export const Route = createFileRoute('/_auth/seguridad/')({
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.ROLE_ACCOUNTS],
      queryFn: RoleAccountsService.getRoleAccounts,
    }),
  component: () => <AsignRoles />,
})
