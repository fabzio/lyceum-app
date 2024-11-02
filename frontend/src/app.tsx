import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuth } from './hooks/useAuth'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorPage from './layouts/ErrorPage'
import NotFound from './layouts/NotFound'
import { useSessionStore } from './store'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: { auth: undefined!, queryClient, sessionStore: undefined! },
  defaultErrorComponent: ({ error }) => (
    <ErrorPage displayErrorMessage={error.message} />
  ),
  defaultNotFoundComponent: () => <NotFound />,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  )
}

function InnerApp() {
  const auth = useAuth()
  const sessionStore = useSessionStore()
  if (auth.isLoading) return <div></div>
  return (
    <RouterProvider router={router} context={{ auth, sessionStore }} />
  )
}
