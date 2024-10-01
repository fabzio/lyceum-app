import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuth } from './hooks/useAuth'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: { authenticated: undefined!, queryClient },
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
