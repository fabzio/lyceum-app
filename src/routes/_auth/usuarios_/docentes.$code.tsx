import TransitionPage from '@/components/anim/TransitionPage'
import { QueryKeys } from '@/constants/queryKeys'
import ProfessorService from '@/modules/users/services/Professor.service'
import ProfessorDetail from '@/modules/users/views/Professors/ProfessorDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/docentes/$code')({
  validateSearch: () =>
    ({}) as {
      mode: 'edit' | 'create' | 'view'
    },
  loader: async ({ params: { code }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.PROFESSORS, code],
      queryFn: () => ProfessorService.getProfessorDetail(code),
    })
  },
  component: () => <ProfessorDetailPage />,
})

function ProfessorDetailPage() {
  return (
    <TransitionPage>
      <ProfessorDetail />
    </TransitionPage>
  )
}
