import { createFileRoute } from '@tanstack/react-router'
import Profesors from '@/modules/users/views/Administratives'
import { AdministrativesFilters } from '@/modules/users/views/Administratives/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import AdministrativeService from '@/modules/users/services/Administrative.service'

export const Route = createFileRoute('/_auth/usuarios/administrativos')({
  validateSearch: () => ({}) as AdministrativesFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.ADMINISTRATIVES, {}],
      queryFn: () => AdministrativeService.fetchAdministratives({}),
    })
  },
  component: () => <Profesors />,
})
