import TransitionPage from '@frontend/components/anim/TransitionPage'
import AccountsService from '@frontend/service/Accounts.service'
import Home from '@frontend/views/Home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  loader: async ({ context: { sessionStore, queryClient } }) => {
    const { session } = sessionStore
    return queryClient.ensureQueryData({
      queryKey: ['profile'],
      queryFn: () => AccountsService.fetchAccountProfile(session!.id),
    })
  },
  component: () => <HomePage />,
})

function HomePage() {
  return (
    <TransitionPage>
      <Home />
    </TransitionPage>
  )
}
