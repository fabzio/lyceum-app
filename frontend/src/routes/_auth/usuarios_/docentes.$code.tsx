import TransitionPage from '@frontend/components/anim/TransitionPage'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@frontend/lib/utils'
import ProfessorService from '@frontend/modules/users/services/Professor.service'
import ProfessorDetail from '@frontend/modules/users/views/Professors/ProfessorDetail'
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
