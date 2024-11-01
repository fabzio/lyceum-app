import { createFileRoute, redirect } from '@tanstack/react-router'
import Profesors from '@/modules/users/views/Professors'
import { ProfessorsFilters } from '@/modules/users/views/Professors/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import ProfessorService from '@/modules/users/services/Professor.service'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@/lib/utils'

export const Route = createFileRoute('/_auth/usuarios/docentes')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        UserPermissionsDict.READ_PROFESSORS,
        UserPermissionsDict.WRITE_PROFESSORS,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as ProfessorsFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.PROFESSORS, {}],
      queryFn: () => ProfessorService.fetchProfessors({}),
    })
  },
  component: () => <Profesors />,
})
