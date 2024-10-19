import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuth } from './hooks/useAuth'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorPage from './layouts/ErrorPage'
import NotFound from './layouts/NotFound'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: { authenticated: undefined!, queryClient },
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
  const authenticated = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ authenticated }} />
    </QueryClientProvider>
  )
}
