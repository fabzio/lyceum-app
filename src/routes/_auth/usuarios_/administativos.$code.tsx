import TransitionPage from '@/components/anim/TransitionPage'
import { QueryKeys } from '@/constants/queryKeys'
import AdministrativeService from '@/modules/users/services/Administrative.service'
import AdministrativeDetail from '@/modules/users/views/Administratives/AdministrativeDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/administativos/$code')({
  validateSearch: () =>
    ({}) as {
      mode: 'create' | 'edit' | 'view'
    },
  component: () => <AdministrativeDetailPage />,
  loader: async ({ params: { code }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.ADMINISTRATIVES, code],
      queryFn: () => AdministrativeService.getAdministrativeDetail(code),
    })
  },
})

function AdministrativeDetailPage() {
  return (
    <TransitionPage>
      <AdministrativeDetail />
    </TransitionPage>
  )
}
