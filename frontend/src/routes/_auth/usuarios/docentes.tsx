import { createFileRoute, redirect } from '@tanstack/react-router'
import Profesors from '@frontend/modules/users/views/Professors'
import { ProfessorsFilters } from '@frontend/modules/users/views/Professors/interfaces/CourseFIlters'
import { QueryKeys } from '@frontend/constants/queryKeys'
import ProfessorService from '@frontend/modules/users/services/Professor.service'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@frontend/lib/utils'

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
