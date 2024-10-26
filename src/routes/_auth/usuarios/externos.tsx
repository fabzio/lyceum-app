import { createFileRoute } from '@tanstack/react-router'
import Profesors from '@/modules/users/views/Externs'
import { ExternsFilters } from '@/modules/users/views/Externs/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import ExternService from '@/modules/users/services/Extern.service'

export const Route = createFileRoute('/_auth/usuarios/externos')({
  validateSearch: () => ({}) as ExternsFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.PROFESSORS, {}],
      queryFn: () => ExternService.fetchExterns({}),
    })
  },
  component: () => <Profesors />,
})
