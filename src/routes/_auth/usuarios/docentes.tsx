import { createFileRoute } from '@tanstack/react-router'
import Profesors from '@/modules/users/views/Professors'
import { ProfessorsFilters } from '@/modules/users/views/Professors/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import ProfessorService from '@/modules/users/services/Professor.service'

export const Route = createFileRoute('/_auth/usuarios/docentes')({
  validateSearch: () => ({}) as ProfessorsFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.PROFESSORS, {}],
      queryFn: () => ProfessorService.fetchProfessors({}),
    })
  },
  component: () => <Profesors />,
})
