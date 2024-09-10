import {
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { useAuth } from './hooks/useAuth'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  context: { authenticated: undefined! },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
export default function App() {
  const authenticated = useAuth()

  return <RouterProvider router={router} context={{ authenticated }} />
}
