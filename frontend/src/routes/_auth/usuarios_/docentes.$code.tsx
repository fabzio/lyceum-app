import TransitionPage from '@/components/anim/TransitionPage'
import { QueryKeys } from '@/constants/queryKeys'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@/lib/utils'
import ProfessorService from '@/modules/users/services/Professor.service'
import ProfessorDetail from '@/modules/users/views/Professors/ProfessorDetail'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/docentes/$code')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        UserPermissionsDict.WRITE_PROFESSORS,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
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
